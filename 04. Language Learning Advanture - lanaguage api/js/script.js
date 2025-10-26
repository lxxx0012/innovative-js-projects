document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startRecognition");
  const stopButton = document.getElementById("stopRecognition");
  const languageSelect = document.getElementById("languageSelect");
  const speechOutput = document.getElementById("speechOutput");
  const translationLanguage = document.getElementById("translationLanguage");
  const translatedOutput = document.getElementById("translatedOutput");

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = languageSelect.value; // Default recognition language
    recognition.interimResults = true; // Enable real-time transcription

    let recognizing = false;

    // Dynamically update recognition language
    languageSelect.addEventListener("change", () => {
      recognition.lang = languageSelect.value;
    });

    // Start Speech Recognition
    startButton.addEventListener("click", () => {
      if (!recognizing) {
        recognition.start();
        recognizing = true;
        speechOutput.value = "Listening...";
        startButton.disabled = true;
        stopButton.disabled = false;
      }
    });

    // Stop Speech Recognition
    stopButton.addEventListener("click", () => {
      if (recognizing) {
        recognition.stop();
        recognizing = false;
        startButton.disabled = false;
        stopButton.disabled = true;
        speechOutput.value += " (Stopped)";
      }
    });

    // Process recognized speech and auto-translate
    recognition.onresult = async (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join('');
      speechOutput.value = transcript;

      if (!transcript) {
        translatedOutput.value = "No speech detected. Cannot translate.";
        return;
      }

      // Auto-translate the recognized text using LibreTranslate
      const targetLanguage = translationLanguage.value;
      const sourceLanguage = recognition.lang.split('-')[0]; // Extract language code (e.g., "en" from "en-US")

      try {
        const response = await fetch("https://libretranslate.com/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            q: transcript, // Text to translate
            source: sourceLanguage, // Source language code
            target: targetLanguage // Target language code
          })
        });

        const data = await response.json();
        if (data && data.translatedText) {
          translatedOutput.value = data.translatedText;
        } else {
          throw new Error("Invalid response format from LibreTranslate.");
        }
      } catch (error) {
        console.error("Translation error:", error);
        translatedOutput.value = "Translation failed. Please try again.";
      }
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
      speechOutput.value = `Error: ${event.error}`;
      recognizing = false;
      startButton.disabled = false;
      stopButton.disabled = true;
    };

    // Reset when recognition ends
    recognition.onend = () => {
      recognizing = false;
      startButton.disabled = false;
      stopButton.disabled = true;
    };
  } else {
    // Browser doesn't support the SpeechRecognition API
    speechOutput.value = "SpeechRecognition API is not supported in this browser.";
    startButton.disabled = true;
    stopButton.disabled = true;
  }
});
