// Ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const quests = [
    { phrase: "Hello, how are you?", answer: "Hola, ¿cómo estás?" },
    { phrase: "Thank you!", answer: "¡Gracias!" },
    { phrase: "Where is the train station?", answer: "¿Dónde está la estación de tren?" }
  ];

  let currentQuestIndex = 0;

  const questText = document.getElementById("questText");
  const feedback = document.getElementById("feedback");
  const progressBar = document.getElementById("progressBar");
  const successAudio = document.getElementById("successAudio");
  const errorAudio = document.getElementById("errorAudio");

  const updateQuest = () => {
    if (currentQuestIndex < quests.length) {
      questText.textContent = `Translate the phrase: "${quests[currentQuestIndex].phrase}"`;
    } else {
      questText.textContent = "All quests completed! Great job!";
    }
  };

  const checkAnswer = () => {
    const userInput = document.getElementById("userInput").value.toLowerCase();
    if (userInput === quests[currentQuestIndex].answer.toLowerCase()) {
      feedback.textContent = "Correct! Great job!";
      successAudio.play();
      incrementProgress();
      currentQuestIndex++;
      updateQuest();
    } else {
      feedback.textContent = "Try again!";
      errorAudio.play();
    }
  };

  document.getElementById("submitAnswer").addEventListener("click", checkAnswer);

  const incrementProgress = () => {
    if (progressBar.value < progressBar.max) {
      progressBar.value += 100 / quests.length;
    }
  };

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

  updateQuest();
});
