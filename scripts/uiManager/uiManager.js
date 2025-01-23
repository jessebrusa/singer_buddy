import Title from './widgets/title/title.js';
import MusicSettings from './widgets/musicSettings.js';

class UIManager {
    constructor(projectManager) {
        this.projectManager = projectManager;
        this.title = new Title();
        this.musicSettings = new MusicSettings();

        this.title.createTitle();
        this.musicSettings.createMusicSettings();
    }
}

export default UIManager;