import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../Components/BehaviourScene.js";
import GameManager from "../Game/GameManager.js";
import SoundManager from "../Level/SoundManager.js";

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

        // Background image
        this._background = this.add.image(0, 0, SPRITE_KEYS.background).setOrigin(0, 0);

        // create the Sound manager
        var soundManagerContainer = this.add.container()
        this.MakeBehaviors(soundManagerContainer, {
            "sound_manager": new SoundManager(),
        });
        this._soundManager = soundManagerContainer.GetBehaviour("sound_manager");

        // Camera
        this._camera = this.cameras.main;
        this.MakeBehaviors(this._camera, {
            "camera_controller": new CameraController(),
        });
        this._cameraController = this.cameras.main.GetBehaviour("camera_controller");

        this.LaunchLoginScene();
    }

    LaunchLoginScene(){
        this.scene.launch(SCENE_LOGIN, {
            gameManager: this._gameManager.GetBehaviour("game_manager"),
        });
    }
}