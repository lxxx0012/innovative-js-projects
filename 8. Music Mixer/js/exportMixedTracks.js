import { audioContext } from './wave.js';

export function exportMixedTracks() {
    const recorder = new MediaRecorder(audioContext.destination.stream);
    const chunks = [];

    recorder.ondataavailable = (event) => chunks.push(event.data);
    recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'mixed_track.webm';
        downloadLink.click();
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 5000); // Stop recording after 5 seconds
}