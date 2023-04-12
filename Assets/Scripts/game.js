//#region imports
import SampleScene from "./scenes/SampleScene.js"
//#endregion

// #region GAME CONFIGURATION
const config = {
    type: Phaser.WEBGL,
    width: GAME_WIDTH, height: GAME_HEIGHT,
    parent: 'game_viewport',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // deactivate vertical gravity
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
// #endregion