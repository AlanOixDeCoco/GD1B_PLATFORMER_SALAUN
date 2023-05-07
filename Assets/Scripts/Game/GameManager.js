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
            ).setOrigin(.5, 0);
        }

        super.start();
    }
    
    update(){
        if(DEBUG) this._debugPlayfabID.setText(this._playfabManager._connected ? `Playfab ID: ${PlayFab._internalSettings.authenticationContext.PlayFabId}` : "Not logged in ...");
    }
}