document.addEventListener("DOMContentLoaded", () => {
    const cluesContainer = document.getElementById("clues-container");
    const nextRoomButton = document.getElementById("next-room-btn");

    // Example puzzle
    cluesContainer.innerHTML = `<p>Solve this riddle to proceed:</p>
        <p>What has keys but can't open locks?</p>
        <input type="text" id="answer" placeholder="Your Answer">
        <button id="submit-btn">Submit</button>`;

    document.getElementById("submit-btn").addEventListener("click", () => {
        const answer = document.getElementById("answer").value.toLowerCase();
        if (answer === "piano") {
            alert("Correct! Proceeding to the next room...");
            // Logic to move to the next room
        } else {
            alert("Try again!");
        }
    });

    nextRoomButton.addEventListener("click", () => {
        // Navigate to next room (or HTML file)
        window.location.href = "puzzles/room2.html";
    });
});
