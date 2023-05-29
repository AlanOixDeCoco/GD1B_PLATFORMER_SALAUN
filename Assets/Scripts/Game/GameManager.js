import Behaviour from "../components/Behaviour.js";
import PlayfabManager from "./PlayfabManager.js";
import SaveManager from "./SaveManager.js";

export default class GameManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        this._startTime = this._scene.time.now;
        this._data = {
            floor: 0,
            souls: 0,
            time: 0,

            playerStats: {
                level: 1,
                experience: 0,
                skills: [],
                maxHealth: PLAYER_DEFAULT_HEALTH,
                health: PLAYER_DEFAULT_HEALTH,
                invincibleDuration: PLAYER_DEFAULT_INVINCIBLE_DURATION,
                maxSpeed: PLAYER_DEFAULT_SPEED,
                speed: PLAYER_DEFAULT_SPEED,
                maxJumpVelocity: PLAYER_DEFAULT_JUMP_VELOCITY,
                jumpVelocity: PLAYER_DEFAULT_JUMP_VELOCITY,
                maxDashVelocity: PLAYER_DEFAULT_DASH_VELOCITY,
                dashVelocity: PLAYER_DEFAULT_DASH_VELOCITY,
                maxDashDuration: PLAYER_DEFAULT_DASH_DURATION,
                dashDuration: PLAYER_DEFAULT_DASH_DURATION,
                dashRecoverTime: PLAYER_DEFAULT_DASH_RECOVER_TIME,
                attackDamage: PLAYER_DEFAULT_ATTACK_DAMAGE,
                attackSpeed: PLAYER_DEFAULT_ATTACK_SPEED,
                attackLifetime: PLAYER_DEFAULT_ATTACK_LIFETIME
            }
        }

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
        
        this._paused = true;
        //#endregion

        super.start();
    }
    
    update(time, deltatime){
        if(DEBUG) this._debugPlayfabID.setText(this._playfabManager._connected ? `Playfab ID: ${PlayFab._internalSettings.authenticationContext.PlayFabId}` : "Not logged in ...");
        if(Phaser.Input.Keyboard.JustDown(this._gameKeys.escape)){
            this._paused = !this._paused;
            this._paused ? this._currentScene.scene.pause() : this._currentScene.scene.resume();
        }

        if(!this._paused) this._data.time += deltatime;
    }

    GetNextFloor(){
        if(this._data.floor < 9){
            this._data.floor++;
            return SCENE_DUNGEON_FLOOR;
        }
        else {
            this._data.floor = 0;
            return SCENE_DUNGEON_BOSS;
        }
    }

    SetCurrentScene(scene){
        this._currentScene = scene;
    }

    SetFloorManager(floorManager){
        this._floorManager = floorManager;
    }

    GetTimeInMinutes(){
        var seconds = (Math.round(this._data.time / 1000));
        var remainingSeconds = seconds % 60;
        var minutes = (seconds - remainingSeconds) / 60;
        return `${minutes}' ${remainingSeconds}"`;
    }
}