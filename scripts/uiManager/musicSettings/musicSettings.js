class MusicSettings {
    constructor(appContainer) {
        this.appContainer = appContainer;
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
        const bpmButton = document.createElement('button');
        bpmButton.classList.add('bpm-button', 'button');
        bpmButton.textContent = '120';

        const bpmWheel = this.createBpmWheel();

        const bpmContainer = document.createElement('div');
        bpmContainer.classList.add('input-container');
        bpmContainer.appendChild(bpmLabel);
        bpmContainer.appendChild(bpmButton);
        bpmContainer.appendChild(bpmWheel);

        bpmButton.addEventListener('click', () => {
            bpmWheel.classList.toggle('visible');
            this.updateBpmWheel(bpmWheel, bpmButton.textContent);
        });

        bpmWheel.addEventListener('mousedown', this.startDrag.bind(this, bpmWheel, bpmButton));
        bpmWheel.addEventListener('touchstart', this.startDrag.bind(this, bpmWheel, bpmButton), { passive: true });

        return bpmContainer;
    }

    createBpmWheel() {
        const bpmWheel = document.createElement('div');
        bpmWheel.classList.add('bpm-wheel');

        for (let i = 0; i < 5; i++) {
            const bpmNumber = document.createElement('div');
            bpmNumber.classList.add('bpm-number');
            bpmWheel.appendChild(bpmNumber);
        }

        return bpmWheel;
    }

    updateBpmWheel(bpmWheel, bpmValue) {
        const bpmNumbers = bpmWheel.querySelectorAll('.bpm-number');
        const bpm = parseInt(bpmValue, 10);

        for (let i = 0; i < bpmNumbers.length; i++) {
            const offset = i - 2;
            const value = bpm + offset;
            bpmNumbers[i].textContent = value;
            bpmNumbers[i].style.transform = `scale(${1 - Math.abs(offset) * 0.2})`;
            bpmNumbers[i].style.opacity = `${1 - Math.abs(offset) * 0.3}`;
        }
    }

    startDrag(bpmWheel, bpmButton, event) {
        event.preventDefault();
        const startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
        const initialBpm = parseInt(bpmButton.textContent, 10);

        const onMouseMove = (moveEvent) => {
            const currentX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
            const deltaX = currentX - startX;
            const bpmChange = Math.round(deltaX / 10); // Adjust sensitivity as needed
            const newBpm = Math.min(Math.max(initialBpm + bpmChange, 40), 180);
            bpmButton.textContent = newBpm;
            this.updateBpmWheel(bpmWheel, newBpm);
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchend', onMouseUp);
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
        findKeyButton.classList.add('find-key-button', 'button');

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