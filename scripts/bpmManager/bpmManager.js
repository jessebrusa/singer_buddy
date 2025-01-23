class BpmManager {
    constructor(initialBpm = 120) {
        this.bpm = initialBpm;
    }

    getBpm() {
        return this.bpm;
    }

    setBpm(newBpm) {
        if (newBpm > 0) {
            this.bpm = newBpm;
        } else {
            throw new Error('BPM must be a positive number');
        }
    }

    increaseBpm(amount = 1) {
        this.bpm += amount;
    }

    decreaseBpm(amount = 1) {
        if (this.bpm - amount > 0) {
            this.bpm -= amount;
        } else {
            throw new Error('BPM must be a positive number');
        }
    }
}

export default BpmManager;