import Behaviour from "../components/Behaviour.js";
import PlayfabManager from "./PlayfabManager.js";
import SaveManager from "./SaveManager.js";

export default class GameManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        this._startTime = this._scene.time.now;

        this._playfabManager = new PlayfabManager();
        this._saveManager = new SaveManager();

        // create a playfab player id feedback message
        if(DEBUG){
            this._debugPlayfabID = this._scene.add.text(
                GAME_WIDTH/2, 8, 
                `Not logged in ...`, 
                {fontFamily: 'Arial', fontSize: 24},
            ).setOrigin(.5, 0).setTint(0xFF0000).setDepth(LAYERS.player);
        }

        // inputs
        this._gameKeys = this._scene.input.keyboard.addKeys({
            escape: Phaser.Input.Keyboard.KeyCodes.ESC,
        });
        
        this._paused = false;
        this._gameKeys.escape.on('down', () => {
            this._paused = !this._paused;
            this._paused ? this._currentScene.scene.pause() : this._currentScene.scene.resume();
        });

        this._interfaceKeys = this._scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.Z, 
            up_arrow: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            down_arrow: Phaser.Input.Keyboard.KeyCodes.DOWN, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            confirm: Phaser.Input.Keyboard.KeyCodes.SPACE,
        });
        //#endregion

        super.start();
    }
    
    update(){
        if(DEBUG) this._debugPlayfabID.setText(this._playfabManager._connected ? `Playfab ID: ${PlayFab._internalSettings.authenticationContext.PlayFabId}` : "Not logged in ...");
    }

    SetCurrentScene(scene){
        this._currentScene = scene;
    }
}