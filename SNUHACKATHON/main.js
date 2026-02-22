
        // Tab functionality
        
        const tabs = document.querySelectorAll('.comm-tab');
        const contents = document.querySelectorAll('.comm-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.dataset.tab;
                
                tabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                document.getElementById(target).classList.add('active');
            });
        });

        // Chat functionality
      /*  const chatInput = document.getElementById('chat-input');
        const sendBtn = document.getElementById('send-message');
        const chatMessages = document.getElementById('chat-messages');

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message) {
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                
                const sentMessage = document.createElement('div');
                sentMessage.className = 'message sent';
                sentMessage.innerHTML = `
                    <p>${escapeHtml(message)}</p>
                    <span class="message-time">${time}</span>
                `;
                chatMessages.appendChild(sentMessage);
                chatInput.value = '';
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Simulate response
                setTimeout(() => {
                    const responses = [
                        "I understand! Thanks for sharing.",
                        "That's great to hear!",
                        "I appreciate your message.",
                        "Got it! Let me know if you need anything else.",
                        "Wonderful! Looking forward to hearing more."
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                    
                    const receivedMessage = document.createElement('div');
                    receivedMessage.className = 'message received';
                    receivedMessage.innerHTML = `
                        <p>${randomResponse}</p>
                        <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    `;
                    chatMessages.appendChild(receivedMessage);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        }
        

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        // Gesture simulation
        const gestureIcons = {
            'hello': 'fa-hand-sparkles',
            'thankyou': 'fa-hands-praying',
            'help': 'fa-hand-holding-medical',
            'yes': 'fa-thumbs-up',
            'no': 'fa-thumbs-down',
            'iloveyou': 'fa-heart'
        };

        const gestureTexts = {
            'hello': 'Gesture: Hello 👋',
            'thankyou': 'Gesture: Thank You 🙏',
            'help': 'Gesture: Help 🆘',
            'yes': 'Gesture: Yes 👍',
        };

        function simulateGesture(gesture) {
            const icon = document.getElementById('gesture-icon');
            const text = document.getElementById('gesture-text');
            
            icon.className = `fas ${gestureIcons[gesture]}`;
            text.textContent = gestureTexts[gesture];
            
            // Add to chat
            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const sentMessage = document.createElement('div');
            sentMessage.className = 'message sent';
            sentMessage.innerHTML = `
                <p>${gestureTexts[gesture]}</p>
                <span class="message-time">${time}</span>
            `;
            chatMessages.appendChild(sentMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Voice recording simulation
        const recordBtn = document.getElementById('record-btn');
        const recordIcon = document.getElementById('record-icon');
        const audioStatusText = document.getElementById('audio-status-text');
        const audioStatusSub = document.getElementById('audio-status-sub');
        const voiceTranscript = document.getElementById('voice-transcript');
        let isRecording = false;

        recordBtn.addEventListener('click', () => {
            isRecording = !isRecording;
            
            if (isRecording) {
                recordBtn.classList.add('recording');
                recordIcon.className = 'fas fa-stop';
                audioStatusText.textContent = 'Recording...';
                audioStatusSub.textContent = 'Speak clearly into your microphone';
                voiceTranscript.textContent = 'Listening...';
                
                // Simulate speech recognition
                setTimeout(() => {
                    const phrases = [
                        "Hello, how are you today?",
                        "I would like to learn more about WEHUMAN.",
                        "This technology is amazing!",
                        "Thank you for helping me communicate.",
                        "Can you tell me more about the features?"
                    ];
                    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
                    voiceTranscript.textContent = randomPhrase;
                    audioStatusText.textContent = 'Speech Detected';
                    audioStatusSub.textContent = 'Text has been generated';
                }, 3000);
            } else {
                recordBtn.classList.remove('recording');
                recordIcon.className = 'fas fa-microphone';
                audioStatusText.textContent = 'Recording Paused';
                audioStatusSub.textContent = 'Click to continue recording';
            }
        });*/

        // Text to Speech
        let speechSynthesis = window.speechSynthesis;
        let currentUtterance = null;

        function convertToSpeech() {
            const text = document.getElementById('tts-input').value;
            if (text.trim()) {
                if (currentUtterance) {
                    speechSynthesis.cancel();
                }
                
                currentUtterance = new SpeechSynthesisUtterance(text);
                currentUtterance.rate = 1;
                currentUtterance.pitch = 1;
                currentUtterance.volume = 1;
                
                speechSynthesis.speak(currentUtterance);
            }
        }

        function stopSpeech() {
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }
        }

        function downloadAudio() {
            const text = document.getElementById('tts-input').value;
            if (text.trim()) {
                alert('Audio download feature would generate an MP3 file with the text content. In a production environment, this would connect to a text-to-speech API service.');
            }
        }

        // Contact form
        function handleContactSubmit(event) {
            event.preventDefault();
            alert('Thank you for your message! We will get back to you within 24-48 hours.');
            event.target.reset();
        }

        // Accessibility functions
        function toggleAccessibilityMenu() {
            const menu = document.getElementById('accessibility-menu');
            menu.classList.toggle('show');
        }

        function toggleHighContrast() {
            document.body.classList.toggle('high-contrast');
        }

        function toggleLargeText() {
            document.body.classList.toggle('large-text');
        }

        function readPageContent() {
            const text = document.body.innerText;
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance('Reading page content. This feature reads the entire page text aloud.');
                speechSynthesis.speak(utterance);
            }
        }

        function resetAccessibility() {
            document.body.classList.remove('high-contrast', 'large-text');
        }

        // Close accessibility menu when clicking outside
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('accessibility-menu');
            const btn = document.querySelector('.accessibility-btn');
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

        // Utility function
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Smooth scroll for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    
const videoElement = document.getElementById('input_video');
const canvasElement = document.getElementById('output_canvas');
const canvasCtx = canvasElement.getContext('2d');
const gestureLabel = document.getElementById('gesture-label');

const hands = new Hands({
    locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

/* ---- FIX CANVAS SIZE ---- */
videoElement.onloadedmetadata = () => {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
};


hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

hands.onResults(onResults);

/* ---- CAMERA ---- */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();

/* ---- RESULTS ---- */
function onResults(results) {

  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0,
    canvasElement.width, canvasElement.height);

  if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {

    const lm = results.multiHandLandmarks[0];

    drawConnectors(canvasCtx, lm, HAND_CONNECTIONS,
      { color: "#00FF00", lineWidth: 3 });
    drawLandmarks(canvasCtx, lm,
      { color: "#FF0000", lineWidth: 2 });

    detectGesture(lm);

  } else {
    gestureLabel.innerText = "No hand detected";
  }

  canvasCtx.restore();
}

/* ---- GESTURE DETECTION ---- */
function detectGesture(lm) {

  const thumbUp = lm[4].x < lm[3].x;
  const indexUp = lm[8].y < lm[6].y;
  const middleUp = lm[12].y < lm[10].y;
  const ringUp = lm[16].y < lm[14].y;
  const pinkyUp = lm[20].y < lm[18].y;

  let gesture = "Hand detected";

  if (thumbUp && indexUp && middleUp && ringUp && pinkyUp)
    gesture = "Hello 👋";

  else if (thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp)
    gesture = "Yes 👍";

  else if (!thumbUp && indexUp && !middleUp && !ringUp && !pinkyUp)
    gesture = "No ☝️";

  else if (thumbUp && indexUp && !middleUp && !ringUp && pinkyUp)
    gesture = "I Love You ❤️";

  gestureLabel.innerText = gesture;
}
/* ---------- VOICE INPUT (SPEECH TO TEXT) ---------- */

const recordBtn = document.getElementById("record-btn");
const recordIcon = document.getElementById("record-icon");
const statusText = document.getElementById("audio-status-text");
const transcript = document.getElementById("voice-transcript");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  statusText.innerText = "Speech recognition not supported";
}

const recognition = new SpeechRecognition();
recognition.lang = "en-US";     // change to "hi-IN" for Hindi
recognition.continuous = false;
recognition.interimResults = true;

/* ---- CLICK MICROPHONE ---- */
recordBtn.addEventListener("click", () => {
  recognition.start();
  statusText.innerText = "Listening...";
  recordIcon.style.color = "red";
});

/* ---- LIVE TRANSCRIPT ---- */
recognition.onresult = (event) => {
  let text = "";

  for (let i = event.resultIndex; i < event.results.length; i++) {
    text += event.results[i][0].transcript;
  }

  transcript.innerText = text;
};

/* ---- WHEN SPEECH ENDS ---- */
recognition.onend = () => {
  statusText.innerText = "Click to Start Recording";
  recordIcon.style.color = "black";
};

/* ---- ERROR ---- */
recognition.onerror = (event) => {
  statusText.innerText = "Error: " + event.error;
  recordIcon.style.color = "black";
};

/* ---------- GESTURE DETECTION ---------- */
/*function detectGesture(lm) {

  // Finger tip vs lower joint comparison
  const thumbUp = lm[4].x < lm[3].x;
  const indexUp = lm[8].y < lm[6].y;
  const middleUp = lm[12].y < lm[10].y;
  const ringUp = lm[16].y < lm[14].y;
  const pinkyUp = lm[20].y < lm[18].y;

  let gesture = "Hand detected";

  // HELLO → all fingers up
  if (thumbUp && indexUp && middleUp && ringUp && pinkyUp) {
    gesture = "Hello 👋";
  }

  // YES → thumbs up only
  else if (thumbUp && !indexUp && !middleUp && !ringUp && !pinkyUp) {
    gesture = "Yes 👍";
  }

  // NO → index finger only
  else if (!thumbUp && indexUp && !middleUp && !ringUp && !pinkyUp) {
    gesture = "No ☝️";
  }

  // I LOVE YOU → thumb + index + pinky
  else if (thumbUp && indexUp && !middleUp && !ringUp && pinkyUp) {
    gesture = "I Love You ❤️";
  }

  gestureLabel.innerText = gesture;
}

hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
});

hands.onResults(results => {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks) {
        gestureLabel.innerText = "Hand detected!";
    } else {
        gestureLabel.innerText = "Waiting for hand...";
    }

    canvasCtx.restore();
});

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 640,
    height: 480
});*/

camera.start();

    