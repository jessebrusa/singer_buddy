import Title from './widgets/title/title.js';


class UIManager {
    constructor() {
        this.elements = {};
        this.title = new Title();

        this.title.createTitle();
    }

    addElement(name, element) {
        if (element) {
            this.elements[name] = element;
            console.log(`Element ${name} added.`);
        } else {
            console.error(`Element ${name} not found.`);
        }
    }
    
    getElement(name) {
        return this.elements[name];
    }

    removeElement(id) {
        delete this.elements[id];
    }

    showElement(id) {
        const element = this.getElement(id);
        if (element) {
            element.style.display = 'block';
        }
    }

    hideElement(id) {
        const element = this.getElement(id);
        if (element) {
            element.style.display = 'none';
        }
    }

    toggleElement(id) {
        const element = this.getElement(id);
        if (element) {
            element.style.display = (element.style.display === 'none') ? 'block' : 'none';
        }
    }
}

export default UIManager;