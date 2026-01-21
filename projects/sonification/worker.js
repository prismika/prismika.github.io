// Audio synthesis Web Worker

const SAMPLE_RATE = 22050;
const DURATION = 2;
const DECAY_MULT = 150;

self.onmessage = function(e) {
    const { pointIndex, eigenvectors, frequencies, eigenvalues } = e.data;
    const numFreq = frequencies.length;
    const coeffs = eigenvectors[pointIndex];

    const numSamples = SAMPLE_RATE * DURATION;
    const data = new Float32Array(numSamples);

    // Pre-compute constants
    const twoPi = 2 * Math.PI;
    const freqScaled = new Float32Array(numFreq);
    const decayScaled = new Float32Array(numFreq);

    for (let j = 0; j < numFreq; j++) {
        freqScaled[j] = twoPi * frequencies[j];
        decayScaled[j] = -eigenvalues[j] * DECAY_MULT;
    }

    // Synthesize
    for (let i = 0; i < numSamples; i++) {
        const t = i / SAMPLE_RATE;
        let sample = 0;

        for (let j = 0; j < numFreq; j++) {
            sample += coeffs[j] * Math.exp(decayScaled[j] * t) * Math.sin(freqScaled[j] * t);
        }

        data[i] = sample;
    }

    // Normalize
    let maxAbs = 0;
    for (let i = 0; i < numSamples; i++) {
        const abs = Math.abs(data[i]);
        if (abs > maxAbs) maxAbs = abs;
    }

    if (maxAbs > 0) {
        const scale = 0.8 / maxAbs;
        for (let i = 0; i < numSamples; i++) {
            data[i] *= scale;
        }
    }

    // Transfer buffer back to main thread
    self.postMessage({ samples: data }, [data.buffer]);
};
