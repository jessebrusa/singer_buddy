import ChangeTitle from './changeTitle.js';

class Title {
    constructor(title = 'Untitled') {
        this.title = title;
        this.isSubmitted = false; 
        this.changeTitle = new ChangeTitle(this);
    }

    createTitle() {
        const titleElement = document.createElement('h1');
        titleElement.textContent = this.title;
        this.applyStyles(titleElement);

        // Add event listeners for hover and click effects
        titleElement.addEventListener('mouseover', () => {
            if (!this.isSubmitted) {
                titleElement.style.transform = 'scale(1.1)';
            }
        });

        titleElement.addEventListener('mouseout', () => {
            if (!this.isSubmitted) {
                titleElement.style.transform = 'scale(1)';
            }
        });

        titleElement.addEventListener('mousedown', () => {
            if (!this.isSubmitted) {
                titleElement.style.transform = 'scale(0.9)';
            }
        });

        titleElement.addEventListener('mouseup', () => {
            if (!this.isSubmitted) {
                titleElement.style.transform = 'scale(1)';
                this.changeTitle.createLabelWithInput();
                this.isSubmitted = true; // Set the state to true after creating the input
            }
        });

        document.body.appendChild(titleElement);
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }

    applyStyles(element) {
        element.style.fontFamily = 'Arial, sans-serif';
        element.style.color = '#333';
        element.style.textAlign = 'center';
        element.style.marginTop = '20px';
        element.style.transition = 'transform 0.2s'; 
        element.style.cursor = 'pointer'; 
    }
}

export default Title;