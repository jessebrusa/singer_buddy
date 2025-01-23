class ChangeTitle {
    constructor(titleInstance, projectManager, titleContainer) {
        this.titleInstance = titleInstance;
        this.projectManager = projectManager;
        this.titleContainer = titleContainer; // Use the titleContainer from Title
    }

    createLabelWithInput() {        
        const label = document.createElement('label');
        label.textContent = 'Enter new title: ';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';

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
        element.classList.remove('visible');
        element.addEventListener('transitionend', () => {
            this.titleContainer.removeChild(element);
        }, { once: true });
    }
}

export default ChangeTitle;