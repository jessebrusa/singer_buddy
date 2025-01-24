import FindKeyModal from './findKey.js';

class MusicSettings {
    constructor(appContainer) {
        this.appContainer = appContainer;
        this.findKeyModal = new FindKeyModal();
        this.overlay = this.createOverlay();
        document.body.appendChild(this.overlay);
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        overlay.addEventListener('click', () => this.closeAllWheels());
        return overlay;
    }

    openOverlay() {
        this.overlay.classList.add('visible');
    }

    closeOverlay() {
        this.overlay.classList.remove('visible');
    }

    closeAllWheels() {
        document.querySelectorAll('.bpm-wheel, .key-wheel, .time-signature-wheel').forEach(wheel => {
            wheel.classList.remove('visible');
        });
        this.closeOverlay();
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

        const bpmWheel = this.createBpmWheel(bpmButton);

        const bpmContainer = document.createElement('div');
        bpmContainer.classList.add('input-container');
        bpmContainer.appendChild(bpmLabel);
        bpmContainer.appendChild(bpmButton);
        bpmContainer.appendChild(bpmWheel);

        bpmButton.addEventListener('click', () => {
            bpmWheel.classList.toggle('visible');
            if (bpmWheel.classList.contains('visible')) {
                this.openOverlay();
                this.updateBpmWheel(bpmWheel, bpmButton.textContent);
            } else {
                this.closeOverlay();
            }
        });

        bpmWheel.addEventListener('mousedown', this.startDrag.bind(this, bpmWheel, bpmButton));
        bpmWheel.addEventListener('touchstart', this.startDrag.bind(this, bpmWheel, bpmButton), { passive: true });

        return bpmContainer;
    }

    createBpmWheel(bpmButton) {
        const bpmWheel = document.createElement('div');
        bpmWheel.classList.add('bpm-wheel');

        for (let i = 0; i < 5; i++) {
            const bpmNumber = document.createElement('div');
            bpmNumber.classList.add('bpm-number');
            bpmWheel.appendChild(bpmNumber);

            // Add click event listener to select the number
            bpmNumber.addEventListener('click', () => {
                bpmButton.textContent = bpmNumber.textContent;
                bpmWheel.classList.remove('visible');
                this.closeOverlay();
            });

            // Add event listeners for dragging
            bpmNumber.addEventListener('mousedown', this.startDrag.bind(this, bpmWheel, bpmButton));
            bpmNumber.addEventListener('touchstart', this.startDrag.bind(this, bpmWheel, bpmButton), { passive: true });
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

    updateWheel(wheel, value, items) {
        const numbers = wheel.querySelectorAll('div');
        const index = items.indexOf(value);

        for (let i = 0; i < numbers.length; i++) {
            const offset = i - 2;
            const item = items[(index + offset + items.length) % items.length];
            numbers[i].textContent = item;
            numbers[i].style.transform = `scale(${1 - Math.abs(offset) * 0.2})`;
            numbers[i].style.opacity = `${1 - Math.abs(offset) * 0.3}`;
        }
    }

    startDrag(wheel, button, event) {
        event.preventDefault();
        const startX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
        const initialValue = button.textContent;

        const onMouseMove = (moveEvent) => {
            const currentX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
            const deltaX = currentX - startX;
            const valueChange = Math.round(deltaX / 10); // Adjust sensitivity as needed
            const items = wheel.classList.contains('bpm-wheel') ? Array.from({ length: 141 }, (_, i) => (i + 40).toString()) : wheel.classList.contains('key-wheel') ? [
                'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
                'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'
            ] : ['4/4', '3/4', '2/4', '6/8', '12/8'];
            const index = items.indexOf(initialValue);
            const newValue = items[(index + valueChange + items.length) % items.length];
            button.textContent = newValue;
            this.updateWheel(wheel, newValue, items);
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
        const keyButton = document.createElement('button');
        keyButton.classList.add('key-button', 'button');
        keyButton.textContent = 'C';

        const keyWheel = this.createKeyWheel(keyButton);

        const keyFunctionButton = document.createElement('button');
        keyFunctionButton.classList.add('key-function-button', 'button');
        keyFunctionButton.textContent = 'Find Key';
        keyFunctionButton.addEventListener('click', () => {
            this.findKeyModal.open();
        });

        const keyButtonsContainer = document.createElement('div');
        keyButtonsContainer.classList.add('key-buttons-container');
        keyButtonsContainer.appendChild(keyButton);
        keyButtonsContainer.appendChild(keyFunctionButton);

        const keyContainer = document.createElement('div');
        keyContainer.classList.add('input-container');
        keyContainer.appendChild(keyLabel);
        keyContainer.appendChild(keyButtonsContainer);
        keyContainer.appendChild(keyWheel);

        keyButton.addEventListener('click', () => {
            keyWheel.classList.toggle('visible');
            if (keyWheel.classList.contains('visible')) {
                this.openOverlay();
                this.updateWheel(keyWheel, keyButton.textContent, [
                    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B',
                    'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m', 'Am', 'A#m', 'Bm'
                ]);
            } else {
                this.closeOverlay();
            }
        });

        keyWheel.addEventListener('mousedown', this.startDrag.bind(this, keyWheel, keyButton));
        keyWheel.addEventListener('touchstart', this.startDrag.bind(this, keyWheel, keyButton), { passive: true });

        return keyContainer;
    }

    createKeyWheel(keyButton) {
        const keyWheel = document.createElement('div');
        keyWheel.classList.add('key-wheel');

        for (let i = 0; i < 5; i++) {
            const keyNumber = document.createElement('div');
            keyNumber.classList.add('key-number');
            keyWheel.appendChild(keyNumber);

            // Add click event listener to select the number
            keyNumber.addEventListener('click', () => {
                keyButton.textContent = keyNumber.textContent;
                keyWheel.classList.remove('visible');
                this.closeOverlay();
            });

            // Add event listeners for dragging
            keyNumber.addEventListener('mousedown', this.startDrag.bind(this, keyWheel, keyButton));
            keyNumber.addEventListener('touchstart', this.startDrag.bind(this, keyWheel, keyButton), { passive: true });
        }

        return keyWheel;
    }

    createTimeSignatureContainer() {
        const timeSignatureLabel = document.createElement('label');
        timeSignatureLabel.textContent = 'Time Signature:';
        const timeSignatureButton = document.createElement('button');
        timeSignatureButton.classList.add('time-signature-button', 'button');
        timeSignatureButton.textContent = '4/4';

        const timeSignatureWheel = this.createTimeSignatureWheel(timeSignatureButton);

        const timeSignatureContainer = document.createElement('div');
        timeSignatureContainer.classList.add('input-container');
        timeSignatureContainer.appendChild(timeSignatureLabel);
        timeSignatureContainer.appendChild(timeSignatureButton);
        timeSignatureContainer.appendChild(timeSignatureWheel);

        timeSignatureButton.addEventListener('click', () => {
            timeSignatureWheel.classList.toggle('visible');
            if (timeSignatureWheel.classList.contains('visible')) {
                this.openOverlay();
                this.updateWheel(timeSignatureWheel, timeSignatureButton.textContent, ['4/4', '3/4', '2/4', '6/8', '12/8']);
            } else {
                this.closeOverlay();
            }
        });

        timeSignatureWheel.addEventListener('mousedown', this.startDrag.bind(this, timeSignatureWheel, timeSignatureButton));
        timeSignatureWheel.addEventListener('touchstart', this.startDrag.bind(this, timeSignatureWheel, timeSignatureButton), { passive: true });

        return timeSignatureContainer;
    }

    createTimeSignatureWheel(timeSignatureButton) {
        const timeSignatureWheel = document.createElement('div');
        timeSignatureWheel.classList.add('time-signature-wheel');

        for (let i = 0; i < 5; i++) {
            const timeSignatureNumber = document.createElement('div');
            timeSignatureNumber.classList.add('time-signature-number');
            timeSignatureWheel.appendChild(timeSignatureNumber);

            // Add click event listener to select the number
            timeSignatureNumber.addEventListener('click', () => {
                timeSignatureButton.textContent = timeSignatureNumber.textContent;
                timeSignatureWheel.classList.remove('visible');
                this.closeOverlay();
            });

            // Add event listeners for dragging
            timeSignatureNumber.addEventListener('mousedown', this.startDrag.bind(this, timeSignatureWheel, timeSignatureButton));
            timeSignatureNumber.addEventListener('touchstart', this.startDrag.bind(this, timeSignatureWheel, timeSignatureButton), { passive: true });
        }

        return timeSignatureWheel;
    }
}

export default MusicSettings;