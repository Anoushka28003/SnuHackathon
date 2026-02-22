// --- Configuration ---
const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');
const gestureLabel = document.getElementById('gesture-label');
const chatWindow = document.getElementById('chatWindow');
const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const apiKeyInput = document.getElementById('apiKey');

// --- State ---
let lastGesture = "";
let cooldown = false;

// --- 1. Setup MediaPipe Hands ---
const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({image: videoElement});
    },
    width: 640,
    height: 480
});

camera.start();

// --- 2. Hand Tracking & Gesture Logic ---
function onResults(results) {
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Draw the hand
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {color: '#00E5FF', lineWidth: 2});
        drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 1});

        // Detect Gesture
        const gesture = detectGesture(landmarks);
        
        if (gesture && gesture !== lastGesture && !cooldown) {
            lastGesture = gesture;
            gestureLabel.innerText = `Detected: ${gesture}`;
            processInput(gesture, "sign");
            
            // Cooldown to prevent spamming
            cooldown = true;
            setTimeout(() => { cooldown = false; }, 2000);
        }
    } else {
        gestureLabel.innerText = "No hand detected";
    }
    canvasCtx.restore();
}

// Simple Heuristic Gesture Detection (No heavy ML model needed for demo)
function detectGesture(landmarks) {
    // Landmarks: 4=ThumbTip, 3=ThumbIP, 8=IndexTip, 12=MiddleTip, 16=RingTip, 20=PinkyTip
    
    const thumbUp = landmarks[4].y < landmarks[3].y && landmarks[3].y < landmarks[2].y;
    const fingersOpen = landmarks[8].y < landmarks[6].y && 
                        landmarks[12].y < landmarks[10].y && 
                        landmarks[16].y < landmarks[14].y && 
                        landmarks[20].y < landmarks[18].y;
    const fist = !fingersOpen && landmarks[4].y > landmarks[9].y; // Thumb crosses palm area roughly

    if (thumbUp) return "Hello / Thumbs Up";
    if (fingersOpen) return "Open Hand (Stop/Wait)";
    if (fist) return "Fist (Okay)";
    
    return null;
}

// --- 3. Communication Logic (LLM & Audio) ---

async function processInput(text, type) {
    addMessage(text, 'user');
    
    // Text to Speech (For Blind Users)
    speak(text);

    // Optional: Send to LLM for smart response
    const apiKey = apiKeyInput.value;
    if(apiKey) {
        const response = await getLLMResponse(text);
        addMessage(response, 'bot');
        speak(response);
    } else {
        // Fallback if no API key
         
        // Fallback if no API key
        const fallback = "I understood: " + text;
        addMessage(fallback, 'bot');
    }
}

// --- 4. LLM API CALL ---
async function getLLMResponse(userText) {
    const apiKey = apiKeyInput.value;

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant communicating with sign language users." },
                    { role: "user", content: userText }
                ]
            })
        });

        const data = await res.json();
        return data.choices[0].message.content;

    } catch (err) {
        console.error(err);
        return "Error getting response.";
    }
}

// --- 5. CHAT UI ---
function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = sender;
    msg.innerText = text;
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// --- 6. TEXT TO SPEECH ---
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

// --- 7. SEND TEXT BUTTON ---
sendBtn.addEventListener("click", () => {
    const text = textInput.value.trim();
    if (!text) return;
    processInput(text, "text");
    textInput.value = "";
});

// ENTER KEY SEND
textInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});

// --- 8. VOICE INPUT (MIC) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    micBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        const speechText = event.results[0][0].confidence > 0.5
            ? event.results[0][0].transcript
            : "";
        if (speechText) processInput(speechText, "voice");
    };
}