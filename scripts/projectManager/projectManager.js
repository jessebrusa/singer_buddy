class ProjectManager {
    constructor() {
        this.data = {
            title: 'Untitled',
            bpm: 120,
            key: 'C',
            timeSignature: '4/4'
        };
    }

    getValue(key) {
        return this.data[key];
    }

    setValue(key, value) {
        this.data[key] = value;
    }
}

export default ProjectManager;