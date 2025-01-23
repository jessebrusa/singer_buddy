import ChangeTitle from './changeTitle.js';

class Title {
    constructor(projectManager, appContainer) {
        this.projectManager = projectManager;
        this.appContainer = appContainer;
        this.title = 'Untitled';
        this.isSubmitted = false;
        this.changeTitle = new ChangeTitle(this, projectManager);
        this.titleElement = null; // Store reference to the title element
    }

    createTitle() {
        this.titleElement = document.createElement('h1');
        this.titleElement.textContent = this.title;
        this.applyStyles(this.titleElement);

        // Add event listeners for hover and click effects
        this.titleElement.addEventListener('mouseover', () => {
            if (!this.isSubmitted) {
                this.titleElement.style.transform = 'scale(1.1)';
            }
        });

        this.titleElement.addEventListener('mouseout', () => {
            if (!this.isSubmitted) {
                this.titleElement.style.transform = 'scale(1)';
            }
        });

        this.titleElement.addEventListener('mousedown', () => {
            if (!this.isSubmitted) {
                this.titleElement.style.transform = 'scale(0.9)';
            }
        });

        this.titleElement.addEventListener('mouseup', () => {
            if (!this.isSubmitted) {
                this.titleElement.style.transform = 'scale(1)';
                this.changeTitle.createLabelWithInput();
                this.isSubmitted = true;
            }
        });

        this.appContainer.appendChild(this.titleElement);
    }

    setTitle(newTitle) {
        this.title = newTitle;
        if (this.titleElement) {
            this.titleElement.textContent = newTitle; // Update the DOM element
        }
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