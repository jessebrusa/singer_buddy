import KeyManager from './keyManager/keyManager.js';
import BpmManager from './bpmManager/bpmManager.js';
import TimeSignatureManager from './timeSignatureManager/timeSignatureManager.js';
import ProjectManager from './projectManager/projectManager.js';
import UIManager from './uiManager/uiManager.js';

function main() {
    let bpmManager = new BpmManager();
    let keyManager = new KeyManager();
    let timeSignatureManager = new TimeSignatureManager();
    let projectManager = new ProjectManager(); 
    let uiManager = new UIManager();

    console.log(`${bpmManager.getBpm()} BPM`);
    console.log(`Key: ${keyManager.key}, Notes: ${keyManager.getNotes()}`);
    console.log(`Time Signature: ${timeSignatureManager.getTimeSignature()}`);
    console.log(`Project: ${projectManager.getName()}`);

    const bpmElement = document.getElementById('bpm');
    uiManager.addElement('bpm', bpmElement);

    // Test showing and hiding the element
    uiManager.hideElement('bpm');
    setTimeout(() => uiManager.showElement('bpm'), 2000);
}

main();