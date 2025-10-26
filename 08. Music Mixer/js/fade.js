export function applyFade(audioElement) {
    const fadeInDuration = parseInt(document.getElementById('fade-in').value, 10);
    const fadeOutDuration = parseInt(document.getElementById('fade-out').value, 10);

    audioElement.addEventListener('play', () => {
        let volume = 0;
        const fadeIn = setInterval(() => {
            volume = Math.min(volume + 0.1, 1);
            audioElement.volume = volume;
            if (volume >= 1) clearInterval(fadeIn);
        }, fadeInDuration / 10);
    });

    audioElement.addEventListener('pause', () => {
        let volume = audioElement.volume;
        const fadeOut = setInterval(() => {
            volume = Math.max(volume - 0.1, 0);
            audioElement.volume = volume;
            if (volume <= 0) clearInterval(fadeOut);
        }, fadeOutDuration / 10);
    });
}