document.addEventListener("DOMContentLoaded", () => {
    const navigation = document.getElementById("navigation");

    // Get the current page's file name from the URL
    const currentPage = window.location.pathname.split("/").pop();

    // Define navigation links for each page
    const navigationLinks = {
        "index.html": { next: "puzzles/time.html", back: "" },
        "time.html": { next: "pattern.html", back: "../index.html" },
        "pattern.html": { next: "jigsaw.html", back: "time.html" },
        "jigsaw.html": { next: "riddle.html", back: "pattern.html" },
        "riddle.html": { next: "", back: "jigsaw.html" }
    };

    // Get the navigation data for the current page
    const { next, back } = navigationLinks[currentPage] || {};

    // Dynamically generate Back and Next buttons if applicable
    navigation.innerHTML = `
        ${back ? `<button id="back-button">Back</button>` : ""}
        ${next ? `<button id="next-button">Next</button>` : ""}
    `;

    // Add event listeners for the buttons
    if (back) {
        document.getElementById("back-button").addEventListener("click", () => {
            window.location.href = back;
        });
    }

    if (next) {
        document.getElementById("next-button").addEventListener("click", () => {
            window.location.href = next;
        });
    }
});