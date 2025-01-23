import ChangeTitle from './changeTitle.js';

class Title {
    constructor(projectManager, appContainer) {
        this.projectManager = projectManager;
        this.appContainer = appContainer;
        this.title = 'Untitled';
        this.isSubmitted = false;
        this.titleElement = null; // Store reference to the title element
        this.container = document.createElement('div'); // Create a container element
        this.container.classList.add('title-container'); // Add a class for styling
        this.applyContainerStyles(this.container); // Apply styles to the container

        this.titleContainer = document.createElement('div'); // Create a container for the title
        this.titleContainer.classList.add('title-element-container'); // Add a class for styling
        this.container.appendChild(this.titleContainer); // Append title container to the main container

        this.changeTitle = new ChangeTitle(this, projectManager, this.titleContainer); // Pass titleContainer to ChangeTitle
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

        this.titleContainer.appendChild(this.titleElement); // Append title to the title container
        this.appContainer.appendChild(this.container); // Append main container to the app container
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

    applyContainerStyles(container) {
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.marginTop = '20px';
    }
}

export default Title;