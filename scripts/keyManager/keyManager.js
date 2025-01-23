class KeyManager {
    constructor(key = 'C') {
        this.key = key;
        this.notes = this.generateNotes(key);
    }

    generateNotes(key) {
        const notes = {
            C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
            G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
            D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
            A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
            E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
            B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
            F: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']
        };
        return notes[key] || [];
    }

    transpose(note, interval) {
        const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        let noteIndex = allNotes.indexOf(note);
        if (noteIndex === -1) return null;
        let newIndex = (noteIndex + interval) % allNotes.length;
        if (newIndex < 0) newIndex += allNotes.length;
        return allNotes[newIndex];
    }

    getNotes() {
        return this.notes;
    }
}

export default KeyManager;