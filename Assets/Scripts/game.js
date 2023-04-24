//#region imports
import SampleScene from "./scenes/SampleScene.js";
//#endregion

// #region GAME CONFIGURATION
const config = {
    type: Phaser.WEBGL,
    scale: {
        parent: 'game_viewport',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH, 
        height: GAME_HEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 9.81 * 32 },
            debug: DEBUG
        }
    },
    pixelArt: true,
    scene: [
        SampleScene
    ],
    input: {
        gamepad: true,
    },
};
let game = new Phaser.Game(config); // creates the game object
console.log(`${GAME_TITLE} - Version ${GAME_VERSION}`);
// #endregion