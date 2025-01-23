const style = document.createElement('style');
style.textContent = `
    .change-title-box {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-in; /* Faster transition for sliding up */
    }
    .change-title-box.visible {
        max-height: 200px; /* Adjust this value based on the content height */
        transition: max-height 1s ease-out; /* Slower transition for sliding down */
    }
    .change-title-box label {
        display: block;
        margin: 10px 0;
    }
    .input-button-container {
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    .input-button-container input {
        flex: 1;
        margin-right: 10px;
    }
    .button-container {
        display: flex;
    }
    .button-container button {
        margin: 0 5px;
    }
`;
document.head.appendChild(style);

class ChangeTitle {
    constructor(titleInstance, projectManager, titleContainer) {
        this.titleInstance = titleInstance;
        this.projectManager = projectManager;
        this.titleContainer = titleContainer; // Use the titleContainer from Title
    }

    createLabelWithInput() {        
        const label = document.createElement('label');
        label.textContent = 'Enter new title: ';
        this.applyLabelStyles(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';
        this.applyInputStyles(input);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        this.applyButtonStyles(submitButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        this.applyButtonStyles(cancelButton);

        const submitTitle = () => {
            const newTitle = input.value.trim();
            if (newTitle === '') {
            alert('Title cannot be empty.');
            return;
            }
            if (newTitle.length > 100) {
            alert('Title cannot exceed 100 characters.');
            return;
            }
            this.titleInstance.setTitle(newTitle);
            this.slideUpAndRemove(changeTitleBox); // Slide up and remove the change-title-box element
            this.projectManager.setValue('title', newTitle);
            const updatedTitle = this.projectManager.getValue('title');
            this.titleInstance.isSubmitted = false; // Reset the isSubmitted flag
        };

        const cancelTitle = () => {
            this.slideUpAndRemove(changeTitleBox); // Slide up and remove the change-title-box element
            this.titleInstance.isSubmitted = false; // Reset the isSubmitted flag
        };

        submitButton.addEventListener('click', submitTitle);
        cancelButton.addEventListener('click', cancelTitle);
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                submitTitle();
            }
        });

        buttonContainer.appendChild(submitButton);
        buttonContainer.appendChild(cancelButton);

        const inputButtonContainer = document.createElement('div');
        inputButtonContainer.classList.add('input-button-container');
        inputButtonContainer.appendChild(input);
        inputButtonContainer.appendChild(buttonContainer);

        const changeTitleBox = document.createElement('div');
        changeTitleBox.classList.add('change-title-box');
        changeTitleBox.appendChild(label);
        changeTitleBox.appendChild(inputButtonContainer);

        this.titleContainer.appendChild(changeTitleBox);

        // Trigger the slide down effect
        requestAnimationFrame(() => {
            changeTitleBox.classList.add('visible');
        });
    }

    slideUpAndRemove(element) {
        element.style.transition = 'max-height 0.5s ease-in'; // Adjust the transition speed to 0.5s
        element.classList.remove('visible');
        element.addEventListener('transitionend', () => {
            this.titleContainer.removeChild(element);
        }, { once: true });
    }

    applyLabelStyles(label) {
        label.style.marginTop = '10px';
    }

    applyInputStyles(input) {
        input.style.marginTop = '10px';
    }

    applyButtonStyles(button) {
        button.style.marginTop = '10px';
    }
}

export default ChangeTitle;