document.addEventListener("DOMContentLoaded", () => {
    const correctPattern = ["1", "3", "5"]; // Correct sequence
    let userPattern = [];

    document.querySelectorAll('#button-grid button').forEach(button => {
        button.addEventListener('click', () => {
            userPattern.push(button.getAttribute('data-id'));

            if (userPattern.length === correctPattern.length) {
                if (JSON.stringify(userPattern) === JSON.stringify(correctPattern)) {
                    alert("Correct! The door unlocks...");
                } else {
                    alert("Wrong pattern! Try again.");
                }
                userPattern = []; // Reset after checking
            }
        });
    });
});
