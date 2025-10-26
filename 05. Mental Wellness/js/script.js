document.addEventListener("DOMContentLoaded", () => {
    const affirmations = [
        "You are capable of achieving great things.",
        "Peace flows through your mind and body.",
        "You are enough, just as you are."
    ];

    const affirmationElement = document.createElement("p");
    const header = document.querySelector("header");
    affirmationElement.style.fontStyle = "italic";
    affirmationElement.textContent = affirmations[Math.floor(Math.random() * affirmations.length)];
    header.appendChild(affirmationElement);
});
