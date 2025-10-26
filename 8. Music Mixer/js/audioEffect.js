import { addDelayEffect } from './utils.js';

export function applyDelay(trackSource) {
    const delayNode = addDelayEffect(audioContext, trackSource);

    document.getElementById('delay').addEventListener('input', (e) => {
        delayNode.delayTime.value = parseFloat(e.target.value);
    });
}