class TimeSignatureManager {
    constructor(beatsPerMeasure = 4, beatUnit = 4) {
        this.beatsPerMeasure = beatsPerMeasure;
        this.beatUnit = beatUnit;
    }

    setTimeSignature(beatsPerMeasure, beatUnit) {
        this.beatsPerMeasure = beatsPerMeasure;
        this.beatUnit = beatUnit;
    }

    getTimeSignature() {
        return `${this.beatsPerMeasure}/${this.beatUnit}`;
    }

    isValidTimeSignature(beatsPerMeasure, beatUnit) {
        const validBeatUnits = [1, 2, 4, 8, 16, 32];
        return Number.isInteger(beatsPerMeasure) && beatsPerMeasure > 0 && validBeatUnits.includes(beatUnit);
    }
}

export default TimeSignatureManager;