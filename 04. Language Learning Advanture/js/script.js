// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Feedback for translation
    document.getElementById("submitAnswer").addEventListener("click", () => {
      const userInput = document.getElementById("userInput").value.toLowerCase();
      const feedback = document.getElementById("feedback");
      if (userInput === "hola, ¿cómo estás?") {
        feedback.textContent = "Correct! Great job!";
        incrementProgress();
      } else {
        feedback.textContent = "Try again!";
      }
    });
  
    // Pronunciation Practice
    const startPractice = document.getElementById("startPractice");
    const speechOutput = document.getElementById("speechOutput");
  
    startPractice.addEventListener("click", () => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "es-ES"; // Set language to Spanish for practice
        recognition.start();
        recognition.onresult = (event) => {
          speechOutput.textContent = `You said: ${event.results[0][0].transcript}`;
        };
      } else {
        speechOutput.textContent = "SpeechRecognition API is not supported in this browser.";
      }
    });
  });
  
  // Progress Tracker
  function incrementProgress() {
    const progressBar = document.getElementById("progressBar");
    if (progressBar.value < progressBar.max) {
      progressBar.value += 20; // Increment progress by 20%
    }
  }
  