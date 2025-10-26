document.addEventListener("DOMContentLoaded", () => {
    // AI-Powered Recommendations
    const recommendations = {
        relaxation: ["5-Minute Breathing Exercise", "Guided Meditation for Stress Relief"],
        focus: ["Mindfulness for Productivity", "10-Minute Focus Meditation"],
        gratitude: ["Gratitude Journaling Prompt", "Daily Affirmation: 'I am thankful for today'"]
    };
    const userPreference = "relaxation"; // Example user preference
    const recommendationElement = document.querySelector("#recommendations ul");
    if (recommendationElement) {
        recommendations[userPreference].forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            recommendationElement.appendChild(listItem);
        });
    } else {
        console.error("Recommendations element not found!");
    }

    // Soundscapes
    function playSoundscape(type) {
        const audio = new Audio(`sounds/${type}.mp3`);
        audio.loop = true;
        audio.play();
    }
    const soundscapeSelect = document.querySelector("#soundscape-select");
    if (soundscapeSelect) {
        soundscapeSelect.addEventListener("change", (event) => {
            playSoundscape(event.target.value);
        });
    } else {
        console.error("Soundscape select element not found!");
    }

    // Daily Challenges
    const challenges = [
        "Write 3 things you're grateful for.",
        "Complete a 5-minute breathing exercise.",
        "Share a positive story in the community space."
    ];
    const dailyChallengeElement = document.querySelector("#daily-challenge p");
    if (dailyChallengeElement) {
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        dailyChallengeElement.textContent = randomChallenge;
    } else {
        console.error("Daily Challenge element not found!");
    }

    // Mood-Based Analytics
    const moodData = [3, 4, 5, 2, 4, 5, 3]; // Example mood ratings
    const canvas = document.getElementById("mood-chart");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{
                    label: "Mood Tracker",
                    data: moodData,
                    borderColor: "#87BBAA",
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true, max: 5 }
                }
            }
        });
    } else {
        console.error("Mood Analytics canvas element not found!");
    }

    // Progress Badges
    const userProgress = { journaling: 10, meditations: 5 };
    const badges = [];
    if (userProgress.journaling >= 10) badges.push("Journaling Pro");
    if (userProgress.meditations >= 5) badges.push("Meditation Master");
    const badgeElement = document.querySelector("#badges");
    if (badgeElement) {
        badges.forEach(badge => {
            const badgeItem = document.createElement("div");
            badgeItem.textContent = badge;
            badgeItem.className = "badge";
            badgeElement.appendChild(badgeItem);
        });
    } else {
        console.error("Badges element not found!");
    }
});
