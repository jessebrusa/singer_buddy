import Title from './widgets/title/title.js';
import MusicSettings from './musicSettings/musicSettings.js';

class UIManager {
    constructor(projectManager, bpmManager, keyManager, timeSignatureManager) {
        this.projectManager = projectManager;
        this.appContainer = document.getElementById('app');

        this.bpmManager = bpmManager;
        this.keyManager = keyManager;
        this.timeSignatureManager = timeSignatureManager

        this.title = new Title(projectManager, this.appContainer);
        this.musicSettings = new MusicSettings(this.appContainer, bpmManager, keyManager, timeSignatureManager);

        this.title.createTitle();
        this.musicSettings.createMusicSettings();
    }
}

export default UIManager;