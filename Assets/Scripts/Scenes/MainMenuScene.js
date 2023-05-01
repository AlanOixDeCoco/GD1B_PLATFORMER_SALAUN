import BehaviourScene from "../BehaviourScene.js";

export default class MainMenuScene extends BehaviourScene {
    constructor() {
        super(SCENE_MAIN_MENU, false);
    }

    init(data){
        this._gameManager = data.gameManager;
    }

    create(){
        this.add.text(
            GAME_WIDTH/2, GAME_HEIGHT/2, 
            `MAIN MENU SCENE`, 
            {fontFamily: 'Monogram', fontSize: 48}
        ).setOrigin(.5, .5);
    }

    update(){
    }
}