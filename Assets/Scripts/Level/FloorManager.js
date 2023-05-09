import Behaviour from "../components/Behaviour.js";

export default class FloorManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        this._startTime = this._scene.time.now;

        // create a playfab player id feedback message
        this._scene.add.text(
            GAME_WIDTH/2, 8, 
            `Playfab ID: ${PlayFab._internalSettings.authenticationContext.PlayFabId}`, 
            {fontFamily: 'Monogram', fontSize: 24}
        ).setOrigin(.5, 0);

        super.start();
    }
}