import BehaviourScene from "../BehaviourScene.js";
import GameManager from "../Game/GameManager.js";

export default class BackgroundScene extends BehaviourScene {
    constructor() {
        super(SCENE_BACKGROUND, false);
    }

    create(){
        // create the gameManager
        this._gameManager = this.add.container();
        this.MakeBehaviors(this._gameManager, {
            "game_manager": new GameManager(),
        });

        this.scene.launch(SCENE_LOGIN, {
            gameManager: this._gameManager.GetBehaviour("game_manager"),
        });
    }
}