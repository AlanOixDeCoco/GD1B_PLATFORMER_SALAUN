import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../components/BehaviourScene.js";
import GameManager from "../Game/GameManager.js";

export default class BackgroundScene extends BehaviourScene {
    constructor() {
        super(SCENE_BACKGROUND, false);
    }

    preload(){
        this.load.image("test_bg", './Assets/sprites/test_background__.png');
    }

    create(){
        var background = this.add.image(0, 0, "test_bg").setOrigin(0, 0);

        // create the gameManager
        this._gameManager = this.add.container();
        this.MakeBehaviors(this._gameManager, {
            "game_manager": new GameManager(),
        });

        this._camera = this.cameras.main;
        this.MakeBehaviors(this._camera, {
            "camera_controller": new CameraController(),
        });

        this.scene.launch(SCENE_LOGIN, {
            gameManager: this._gameManager.GetBehaviour("game_manager"),
        });
    }
}