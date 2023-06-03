import Behaviour from "../components/Behaviour.js";

export default class FloorUIController extends Behaviour{
    constructor(gameManager, cylinderSprite){
        super();
        this._gameManager = gameManager;
        this._cylinderSprite = cylinderSprite;
    }

    start(){
        this._scene = this._parent.scene;
        super.start();
    }

    update(){
        // Gets the current frame to display
        const remainingTime = this._gameManager._data.remainingTime;
        const remainingRatio = remainingTime / GAME_DEFAULT_TIME;
        const currentFrameIndex = Math.floor(38 - (38 * remainingRatio));
        this._cylinderSprite.setTexture('environment_ui_atlas', `${SPRITE_KEYS.uiCylinder}${String(currentFrameIndex).padStart(2, '0')}.png`);
    }
}