document.addEventListener("DOMContentLoaded", () => {
    const storyText = document.getElementById("story-text");
    const storyImage = document.getElementById("story-image");
    const choicesContainer = document.getElementById("choices-container");
    const startBtn = document.getElementById("start-btn");
    const saveBtn = document.getElementById("save-btn");
    const loadBtn = document.getElementById("load-btn");
    const uploadBtn = document.getElementById("upload-btn");
    const fileInput = document.getElementById("upload-file");

    let storyData = {};
    let currentStage = "start"; // Track current stage for saving progress

    // Load default story data from JSON file
    fetch("storyData/story1.json")
        .then(response => response.json())
        .then(data => {
            storyData = data;
        })
        .catch(error => {
            console.error("Error loading story:", error);
        });

    // Update the story stage
    function updateStory(stage) {
        const scene = storyData[stage];
        currentStage = stage; // Save the current stage
        storyText.innerText = scene.text;
        storyImage.src = scene.image;
        storyImage.style.animation = "fadeIn 1s ease-in-out"; // Apply animation
        choicesContainer.innerHTML = ""; // Clear previous choices

        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice.text;
            button.onclick = () => updateStory(choice.next);
            choicesContainer.appendChild(button);
        });
    }

    // Save the current progress
    saveBtn.onclick = () => {
        localStorage.setItem("savedStage", currentStage);
        alert("Progress saved!");
    };

    // Load saved progress
    loadBtn.onclick = () => {
        const savedStage = localStorage.getItem("savedStage");
        if (savedStage) {
            updateStory(savedStage);
        } else {
            alert("No saved progress found.");
        }
    };

    // Upload and load user story
    uploadBtn.onclick = () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                try {
                    storyData = JSON.parse(event.target.result); // Parse uploaded story
                    alert("Story uploaded successfully!");
                    updateStory("start");
                } catch (error) {
                    alert("Invalid JSON file.");
                }
            };
            reader.readAsText(file);
        } else {
            alert("No file selected.");
        }
    };

    // Start the story
    startBtn.onclick = () => {
        startBtn.style.display = "none"; // Hide the start button
        updateStory("start");
    };
});
