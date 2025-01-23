class ChangeTitle {
    constructor(titleInstance, projectManager) {
        this.titleInstance = titleInstance;
        this.projectManager = projectManager;
        this.appContainer = titleInstance.appContainer; // Use the appContainer from Title
    }

    createLabelWithInput() {        
        const label = document.createElement('label');
        label.textContent = 'Enter new title:';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = 'Untitled';

        const button = document.createElement('button');
        button.textContent = 'Submit';
        button.addEventListener('click', () => {
            const newTitle = input.value;
            this.titleInstance.setTitle(newTitle);
            this.projectManager.setValue('title', newTitle);
            const updatedTitle = this.projectManager.getValue('title');
            this.appContainer.removeChild(label);
            this.appContainer.removeChild(input);
            this.appContainer.removeChild(button);
        });

        this.appContainer.appendChild(label);
        this.appContainer.appendChild(input);
        this.appContainer.appendChild(button);
    }
}

export default ChangeTitle;