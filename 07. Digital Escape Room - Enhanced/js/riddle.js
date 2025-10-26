document.addEventListener("DOMContentLoaded", () => {
    const correctAnswer = "egg";

    document.getElementById("submit-riddle").addEventListener("click", () => {
        const userAnswer = document.getElementById("riddle-answer").value.toLowerCase();
        if (userAnswer === correctAnswer) {
            alert("Correct! You may proceed.");
        } else {
            alert("Wrong answer! Try again.");
        }
    });
});