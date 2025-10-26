import { audioContext } from './wave.js';
import { initializeEQ } from './utils.js';

export function applyEqualizer(trackSource) {
    const filters = initializeEQ(audioContext, trackSource);

    document.getElementById('bass').addEventListener('input', (e) => {
        filters.bass.gain.value = parseFloat(e.target.value);
    });
    document.getElementById('mid').addEventListener('input', (e) => {
        filters.mid.gain.value = parseFloat(e.target.value);
    });
    document.getElementById('treble').addEventListener('input', (e) => {
        filters.treble.gain.value = parseFloat(e.target.value);
    });
}