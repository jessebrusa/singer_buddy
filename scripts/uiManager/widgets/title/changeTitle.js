class ChangeTitle {
    constructor(titleInstance, projectManager, titleContainer) {
        this.titleInstance = titleInstance;
        this.projectManager = projectManager;
        this.titleContainer = titleContainer; // Use the titleContainer from Title
    }

    createLabelWithInput() {        
        const label = document.createElement('label');
        label.textContent = 'Enter new title:';
        this.applyLabelStyles(label);

        const input = document.createElement('input');
        input.type = 'text';
        input.value = '';
        this.applyInputStyles(input);

        const button = document.createElement('button');
        button.textContent = 'Submit';
        this.applyButtonStyles(button);
        button.addEventListener('click', () => {
            const newTitle = input.value;
            this.titleInstance.setTitle(newTitle);
            this.projectManager.setValue('title', newTitle);
            const updatedTitle = this.projectManager.getValue('title');
            console.log(`Updated title from ProjectManager: ${updatedTitle}`);
            this.titleContainer.removeChild(label);
            this.titleContainer.removeChild(input);
            this.titleContainer.removeChild(button);
            this.titleInstance.isSubmitted = false; // Reset the isSubmitted flag
        });

        this.titleContainer.appendChild(label);
        this.titleContainer.appendChild(input);
        this.titleContainer.appendChild(button);
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