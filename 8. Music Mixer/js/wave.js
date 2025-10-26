import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js';

export const audioContext = new (window.AudioContext || window.webkitAudioContext)();

document.addEventListener("DOMContentLoaded", () => {
    // Select the container and start button
    const container = document.querySelector('#global-waveform');
    const startButton = document.getElementById("start-button");

    if (container && startButton) {
        // Initialize WaveSurfer
        const globalWaveSurfer = WaveSurfer.create({
            container: '#global-waveform',
            waveColor: 'violet',
            progressColor: 'purple',
            height: 150,
            responsive: true,
        });

        // Add a click event listener to allow future audio loading
        startButton.addEventListener("click", () => {
            console.log("Start button clicked. Add your audio loading logic here.");
        });
    } else {
        if (!container) console.error("Container '#global-waveform' not found.");
        if (!startButton) console.error("Button with ID 'start-button' not found.");
    }
});
