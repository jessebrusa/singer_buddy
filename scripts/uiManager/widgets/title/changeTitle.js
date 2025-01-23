class ChangeTitle {
    constructor(titleInstance) {
        this.titleInstance = titleInstance;
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
            this.titleInstance.setTitle(input.value);
            this.titleInstance.isSubmitted = false;
            document.querySelector('h1').textContent = this.titleInstance.title;
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

export default ChangeTitle;