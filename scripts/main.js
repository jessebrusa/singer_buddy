import KeyManager from './keyManager/keyManager.js';
import BpmManager from './bpmManager/bpmManager.js';
import TimeSignatureManager from './timeSignatureManager/timeSignatureManager.js';
import ProjectManager from './projectManager/projectManager.js';
import UIManager from './uiManager/uiManager.js';

function main() {
    let projectManager = new ProjectManager();

    let bpmManager = new BpmManager();
    let keyManager = new KeyManager();
    let timeSignatureManager = new TimeSignatureManager();

    let uiManager = new UIManager(projectManager, bpmManager, keyManager, timeSignatureManager);

}

main();