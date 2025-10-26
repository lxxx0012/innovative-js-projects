// Ensure all DOM manipulation happens after the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Time Manipulation Puzzle
    const submitTimeButton = document.getElementById("submit-time");
    submitTimeButton.addEventListener("click", () => {
        const clock = document.getElementById("clock").value;
        if (clock === "12:30") {
            alert("Correct! The door unlocks...");
        } else {
            alert("Try again!");
        }
    });

    // Sound Puzzle
    const buttons = document.querySelectorAll('button[data-sound]');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const soundId = button.getAttribute('data-sound');
            playSound(soundId);
        });
    });
});

// Hidden Object Puzzle function must be globally accessible
const revealClue = () => {
    alert("Clue found: Check under the carpet!");
};

// Sound Puzzle function, also globally accessible
const playSound = (soundId) => {
    const audioElement = document.getElementById(soundId);
    if (audioElement) {
        audioElement.play();
    } else {
        console.error(`Audio element with ID '${soundId}' not found.`);
    }
};
