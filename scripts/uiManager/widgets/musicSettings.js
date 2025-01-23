class MusicSettings {
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.applyStyles();
    }

    createMusicSettings() {
        const section = document.createElement('section');
        section.classList.add('music-settings');

        const bpmLabel = document.createElement('label');
        bpmLabel.textContent = 'BPM:';
        const bpmInput = document.createElement('input');
        bpmInput.type = 'number';
        bpmInput.classList.add('bpm-input');

        const keyLabel = document.createElement('label');
        keyLabel.textContent = 'Key:';
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.classList.add('key-input');

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

        const bpmContainer = document.createElement('div');
        bpmContainer.classList.add('input-container');
        bpmContainer.appendChild(bpmLabel);
        bpmContainer.appendChild(bpmInput);

        const keyContainer = document.createElement('div');
        keyContainer.classList.add('input-container');
        keyContainer.appendChild(keyLabel);
        keyContainer.appendChild(keyInput);

        const timeSignatureContainer = document.createElement('div');
        timeSignatureContainer.classList.add('input-container');
        timeSignatureContainer.appendChild(timeSignatureLabel);
        timeSignatureContainer.appendChild(timeSignatureSelect);

        section.appendChild(bpmContainer);
        section.appendChild(keyContainer);
        section.appendChild(timeSignatureContainer);

        this.appContainer.appendChild(section);
    }

    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .music-settings {
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                max-width: 800px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .music-settings .input-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 0 10px;
            }
            .music-settings label {
                margin-bottom: 8px;
                font-weight: bold;
            }
            .music-settings input, .music-settings select {
                width: 100px;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }
}

export default MusicSettings;