import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../components/BehaviourScene.js";

export default class MainMenuScene extends BehaviourScene {
    constructor() {
        super(SCENE_MAIN_MENU, false);
    }

    init(data){
        this._gameManager = data.gameManager;
        this._gameManager.SetCurrentScene(this);
    }

    create(){
        this._camera = this.cameras.main;
        this.MakeBehaviors(this._camera, {
            "camera_controller": new CameraController(),
        });

        this.add.text(
            GAME_WIDTH/2, GAME_HEIGHT/2, 
            `MAIN MENU SCENE`, 
            {fontFamily: 'Monogram', fontSize: 48}
        ).setOrigin(.5, .5);

        this.scene.start("sample_scene", {gameManager: this._gameManager});
    }
}