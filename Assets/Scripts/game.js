//#region imports
import BackgroundScene from "./Scenes/BackgroundScene.js";
import DungeonBossScene from "./Scenes/DungeonBossScene.js";
import DungeonBossTransitionScene from "./Scenes/DungeonBossTransitionScene.js";
import DungeonEntranceScene from "./Scenes/DungeonEntranceScene.js";
import DungeonScene from "./Scenes/DungeonScene.js";
import DungeonTransitionScene from "./Scenes/DungeonTransitionScene.js";
import GameoverScene from "./Scenes/GameoverScene.js";
import MainMenuScene from "./Scenes/MainMenuScene.js";
import PreloadScene from "./Scenes/PreloadScene.js";
import LoginScene from "./Scenes/LoginScene.js";
import SampleScene from "./Scenes/SampleScene.js";
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
            gravity: { y: PHYSICS_GRAVITY_Y },
            debug: DEBUG
        }
    },
    pixelArt: true,
    scene: [
        PreloadScene,
        BackgroundScene,
        LoginScene,
        MainMenuScene,
        DungeonEntranceScene,
        DungeonTransitionScene,
        DungeonScene,
        DungeonBossScene,
        DungeonBossTransitionScene,
        GameoverScene,

        SampleScene
    ],
    input: {
        gamepad: true,
    },
};
// #endregion

let game = new Phaser.Game(config); // creates the game object

console.log(`${GAME_TITLE} - Version ${GAME_VERSION}`);