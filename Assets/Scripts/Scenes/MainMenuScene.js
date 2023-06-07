import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../Components/BehaviourScene.js";

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

        this._menuImage = this.add.image(0, 0, SPRITE_KEYS.menu.loading).setOrigin(0, 0);
        
        this._continueText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 25, "Appuyez sur n'importe quelle touche pour continuer...", {fontFamily: "Monogram"})
        .setOrigin(.5, 1)
        .setTint(UI_COLORS.light);
        this._continueText.setVisible(false);

        this._screenIndex = 0;
        setTimeout(() => {
            this.input.keyboard.on('keydown', () => {
                this._screenIndex++;
                switch(this._screenIndex){
                    case 1: 
                        this._menuImage.setTexture(SPRITE_KEYS.menu.objective);
                        break;
                    case 2: 
                        this._menuImage.setTexture(SPRITE_KEYS.menu.keyboardControls);
                        break;
                    case 3: 
                        this._menuImage.setTexture(SPRITE_KEYS.menu.gamepadControls);
                        break;
                    default:
                        break;
                }
                if(this._screenIndex > 3){
                    this.scene.start(SCENE_DUNGEON_ENTRANCE, {gameManager: this._gameManager});
                }
            });
            this._continueText.setVisible(true);
        }, 100);
    }
}