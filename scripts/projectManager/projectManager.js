class FileManager {
    // Implementation of FileManager
}

class Exporter {
    // Implementation of Exporter
}

class StemExporter extends Exporter {
    // Implementation of StemExporter
}

class Save {
    // Implementation of Save
}

class Load {
    // Implementation of Load
}

class ProjectManager {
    constructor(name='Untitled') {
        this.name = name;
        this.fileManager = new FileManager();
        this.exporter = new Exporter();
        this.stemExporter = new StemExporter();
        this.save = new Save();
        this.load = new Load();
    }

    getName() {
        return this.name;
    }
}

export default ProjectManager;
