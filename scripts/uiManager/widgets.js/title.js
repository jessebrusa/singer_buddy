class Title {
    constructor(initialTitle) {
        this.title = initialTitle || 'Default Title';
    }

    display() {
        const titleElement = document.createElement('h1');
        titleElement.textContent = this.title;
        document.body.appendChild(titleElement);
    }

    setTitle(newTitle) {
        this.title = newTitle;
    }
}

export default Title;