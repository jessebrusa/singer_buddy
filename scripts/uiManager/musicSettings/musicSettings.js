class MusicSettings {
    constructor(appContainer, bpmManager, keyManager, timeSignatureManager) {
        this.appContainer = appContainer;
        this.bpmManager = bpmManager;
        this.keyManager = keyManager;
        this.timeSignatureManager = timeSignatureManager;
    }

    createMusicSettings() {
        const section = document.createElement('section');
        section.classList.add('music-settings');

        const bpmContainer = this.createBpmContainer();
        const keyContainer = this.createKeyContainer();
        const timeSignatureContainer = this.createTimeSignatureContainer();

        section.appendChild(bpmContainer);
        section.appendChild(keyContainer);
        section.appendChild(timeSignatureContainer);

        this.appContainer.appendChild(section);
    }

    createBpmContainer() {
        const bpmLabel = document.createElement('label');
        bpmLabel.textContent = 'BPM:';
        const bpmInput = document.createElement('input');
        bpmInput.type = 'number';
        bpmInput.classList.add('bpm-input');

        const bpmContainer = document.createElement('div');
        bpmContainer.classList.add('input-container');
        bpmContainer.appendChild(bpmLabel);
        bpmContainer.appendChild(bpmInput);

        return bpmContainer;
    }

    createKeyContainer() {
        const keyLabel = document.createElement('label');
        keyLabel.textContent = 'Key:';
        const keySelect = document.createElement('select');
        keySelect.classList.add('key-select');

        const keys = [
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
            'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'
        ];
        keys.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            keySelect.appendChild(option);
        });

        const findKeyButton = document.createElement('button');
        findKeyButton.textContent = 'Find Key';
        findKeyButton.classList.add('find-key-button');

        const keySelectContainer = document.createElement('div');
        keySelectContainer.classList.add('key-select-container');
        keySelectContainer.appendChild(keySelect);
        keySelectContainer.appendChild(findKeyButton);

        const keyContainer = document.createElement('div');
        keyContainer.classList.add('input-container');
        keyContainer.appendChild(keyLabel);
        keyContainer.appendChild(keySelectContainer);

        return keyContainer;
    }

    createTimeSignatureContainer() {
        const timeSignatureLabel = document.createElement('label');
        timeSignatureLabel.textContent = 'Time Signature:';
        const timeSignatureSelect = document.createElement('select');
        timeSignatureSelect.classList.add('time-signature-select');

        const timeSignatures = ['4/4', '3/4', '2/4', '6/8', '12/8'];
        timeSignatures.forEach(signature => {
            const option = document.createElement('option');
            option.value = signature;
            option.textContent = signature;
            timeSignatureSelect.appendChild(option);
        });

        const timeSignatureContainer = document.createElement('div');
        timeSignatureContainer.classList.add('input-container');
        timeSignatureContainer.appendChild(timeSignatureLabel);
        timeSignatureContainer.appendChild(timeSignatureSelect);

        return timeSignatureContainer;
    }
}

export default MusicSettings;