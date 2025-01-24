class FindKeyModal {
    constructor() {
        this.modal = this.createModal();
        this.overlay = this.createOverlay();
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.modal);
    }

    createModal() {
        const modal = document.createElement('div');
        modal.classList.add('find-key-modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Find Key</h2>
                <p>Content for finding the key goes here.</p>
                <button class="close-button">Close</button>
            </div>
        `;
        modal.querySelector('.close-button').addEventListener('click', () => this.close());
        return modal;
    }

    createOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('modal-overlay');
        overlay.addEventListener('click', () => this.close());
        return overlay;
    }

    open() {
        this.modal.classList.add('visible');
        this.overlay.classList.add('visible');
    }

    close() {
        this.modal.classList.remove('visible');
        this.overlay.classList.remove('visible');
    }
}

export default FindKeyModal;