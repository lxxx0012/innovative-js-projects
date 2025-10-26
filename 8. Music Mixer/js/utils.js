export function initializeEQ(audioContext, trackSource) {
    const bass = audioContext.createBiquadFilter();
    bass.type = "lowshelf"; bass.frequency.value = 200; bass.gain.value = 0;

    const mid = audioContext.createBiquadFilter();
    mid.type = "peaking"; mid.frequency.value = 1000; mid.gain.value = 0;

    const treble = audioContext.createBiquadFilter();
    treble.type = "highshelf"; treble.frequency.value = 3000; treble.gain.value = 0;

    trackSource.connect(bass).connect(mid).connect(treble).connect(audioContext.destination);

    return { bass, mid, treble };
}

export function addDelayEffect(audioContext, trackSource, initialDelay = 0.3) {
    const delayNode = audioContext.createDelay();
    delayNode.delayTime.value = initialDelay;

    trackSource.connect(delayNode).connect(audioContext.destination);

    return delayNode;
}

export function connectTrackToAudioContext(audioContext, audioElement) {
    return audioContext.createMediaElementSource(audioElement);
}