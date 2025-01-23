class Title {
    constructor(title = 'Untitled') {
        this.title = title;
        this.isSubmitted = false; // State to track if the project name has been submitted
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
                this.createLabelWithInput();
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

    createLabelWithInput() {
        const label = document.createElement('label');
        label.textContent = 'Name Project: ';
        label.style.marginRight = '10px';

        const input = document.createElement('input');
        input.type = 'text';

        const button = document.createElement('button');
        button.textContent = 'Submit';
        button.style.marginLeft = '10px';

        input.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                button.click();
            }
        });

        button.addEventListener('click', () => {
            console.log(input.value);
            this.title = input.value;
            this.isSubmitted = false;
            document.querySelector('h1').textContent = this.title;
            container.remove();
        });

        const container = document.createElement('div');
        container.style.marginTop = '10px';
        container.style.display = 'flex';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';

        container.appendChild(label);
        container.appendChild(input);
        container.appendChild(button);

        document.body.appendChild(container);
    }
}

export default Title;