class ProjectManager {
    constructor(ProjectManager) {
        this.projectManager = ProjectManager;
        this.data = {
            'title': 'Untitled',
            'bpm': 120,
            'key': 'C',
            'timeSignature': '4/4'
        };
    };

    getTitle() {
        return this.data.title;
    };
}

export default ProjectManager;
