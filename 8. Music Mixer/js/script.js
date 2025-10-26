import { audioContext } from './wave.js';
import { initializeEQ, addDelayEffect, connectTrackToAudioContext } from './utils.js';
import { applyFade } from './fade.js';

let filters = null; // Global reference to equalizer filters
let delayNode = null; // Global reference to the delay node

document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const resetButton = document.getElementById("reset-controls");
    const instrumentListItems = document.querySelectorAll(".sound");

    // Drop Area Event Listeners
    dropArea.addEventListener("dragover", (event) => {
        event.preventDefault();
        dropArea.classList.add("dragover");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("dragover");
    });

    dropArea.addEventListener("drop", (event) => {
        event.preventDefault();
        dropArea.classList.remove("dragover");

        const audioPath = event.dataTransfer.getData("text");
        const files = event.dataTransfer.files;

        if (files.length) {
            const file = files[0];
            if (!file.type.match("audio.*")) {
                console.error("Unsupported file type.");
                return;
            }
            createTrack(URL.createObjectURL(file), file.name);
        } else if (audioPath) {
            createTrack(audioPath, audioPath.split('/').pop());
        } else {
            console.error("No valid audio data found.");
        }
    });

    // Instrument List Event Listeners
    instrumentListItems.forEach((sound) => {
        sound.setAttribute("draggable", "true");
        sound.addEventListener("dragstart", (event) => {
            const audioPath = sound.getAttribute("data-audio");
            event.dataTransfer.setData("text", audioPath);
        });
    });

    // Reset Button
    resetButton.addEventListener("click", () => {
        resetControls();
    });
});

function createTrack(audioSrc, trackName) {
    const audioElement = new Audio(audioSrc);
    const trackContainer = document.createElement("div");
    trackContainer.className = "track";
    trackContainer.innerHTML = `
        <p>${trackName}</p>
        <div class="waveform"></div>
        <input type="range" min="0" max="1" step="0.01" value="0.5" class="volume-control" title="Volume">
        <button class="play-pause">Play</button>
        <button class="remove-track">Remove</button>
    `;
    document.getElementById("drop-area").appendChild(trackContainer);

    // Connect audio and effects
    const trackSource = connectTrackToAudioContext(audioContext, audioElement);
    filters = initializeEQ(audioContext, trackSource); // Initialize equalizer filters
    delayNode = addDelayEffect(audioContext, trackSource); // Initialize delay effect
    applyFade(audioElement); // Apply fade effect

    // Play/Pause Button Functionality
    const playPauseButton = trackContainer.querySelector(".play-pause");
    playPauseButton.addEventListener("click", () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseButton.textContent = "Pause";
        } else {
            audioElement.pause();
            playPauseButton.textContent = "Play";
        }
    });

    // Volume Control
    const volumeControl = trackContainer.querySelector(".volume-control");
    volumeControl.addEventListener("input", (event) => {
        audioElement.volume = parseFloat(event.target.value);
    });

    // Remove Button Functionality
    const removeButton = trackContainer.querySelector(".remove-track");
    removeButton.addEventListener("click", () => {
        audioElement.pause();
        trackContainer.remove();
    });
}

function resetControls() {
    console.log("Resetting all controls to default values...");

    // Reset sliders
    const bassSlider = document.getElementById("bass");
    const midSlider = document.getElementById("mid");
    const trebleSlider = document.getElementById("treble");
    const delaySlider = document.getElementById("delay");
    const fadeInInput = document.getElementById("fade-in");
    const fadeOutInput = document.getElementById("fade-out");

    if (bassSlider) bassSlider.value = 0;
    if (midSlider) midSlider.value = 0;
    if (trebleSlider) trebleSlider.value = 0;
    if (delaySlider) delaySlider.value = 0.3;
    if (fadeInInput) fadeInInput.value = 1000;
    if (fadeOutInput) fadeOutInput.value = 1000;

    // Reset audio effects
    if (filters) {
        filters.bass.gain.value = 0;
        filters.mid.gain.value = 0;
        filters.treble.gain.value = 0;
    }
    if (delayNode) {
        delayNode.delayTime.value = 0.3;
    }

    console.log("Controls have been reset.");
}

// Toggle Theme Functionality
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("theme-toggle");

    // Theme Toggle Functionality
    themeToggleButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            console.log("Dark theme enabled");
        } else {
            console.log("Light theme enabled");
        }
    });
});
