import Title from './widgets/title/title.js';
import MusicSettings from './widgets/musicSettings.js';

class UIManager {
    constructor(projectManager) {
        this.projectManager = projectManager;
        this.appContainer = document.getElementById('app');
        this.title = new Title(projectManager, this.appContainer);
        this.musicSettings = new MusicSettings(this.appContainer);

        this.title.createTitle();
        this.musicSettings.createMusicSettings();
    }
}

export default UIManager;