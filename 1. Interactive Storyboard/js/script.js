document.addEventListener("DOMContentLoaded", () => {
    const storyText = document.getElementById("story-text");
    const choicesContainer = document.getElementById("choices-container");
    const startBtn = document.getElementById("start-btn");
    const storyImage = document.getElementById("story-image"); // Reference to the story image
    
    // Story data with the image paths relative to the 'images' folder
    const storyData = {
        start: {
            text: "You wake up in a mysterious forest. Do you explore or stay put?",
            image: "images/Forest.jpg", // Add the image path here
            choices: [
                { text: "Explore", next: "explore" },
                { text: "Stay Put", next: "stay" }
            ]
        },
        explore: {
            text: "You find a hidden path leading to an ancient temple. Enter or turn back?",
            image: "images/Path.jpg", // Add the image path here
            choices: [
                { text: "Enter", next: "temple" },
                { text: "Turn back", next: "start"}
            ]
        },
        stay: {
            text: "You hear rustling in the bushes. Will you investigate or run?",
            image: "images/Bushes.jpg", // Add the image path here
            choices: [
                { text: "Investigate", next: "explore" },
                { text: "Run", next: "start"}
            ]
        },
        temple: {
            text: "Inside the temple, you discover an ancient artifact. The adventure continues ...",
            image: "images/Temple.jpg", // Add the image path here
            choices: []
        }
    };

    function updateStory(stage) {
        const scene = storyData[stage];
        storyText.innerText = scene.text;
        storyImage.src = scene.image; // Dynamically update the image
        choicesContainer.innerHTML = ""; // Clear previous choices

        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.innerText = choice.text;
            button.onclick = () => updateStory(choice.next);
            choicesContainer.appendChild(button);
        });
    }

    startBtn.onclick = () => {
        startBtn.style.display = "none"; // Hide the start button
        updateStory("start");
    };
});