import BehaviourScene from "../Components/BehaviourScene.js";

export default class GameoverScene extends BehaviourScene {
    constructor() {
        super(SCENE_GAMEOVER, false);
    }

    init(data){
        this._gameManager = data.gameManager;
    }

    create(){
        this._timeText = this.add.text(
            GAME_WIDTH/2, GAME_HEIGHT/2 - 16, 
            `Vous avez survécu: ${this._gameManager.GetTimeInMinutes()}`, 
            {fontFamily: 'Arial', fontSize: 24},
        ).setOrigin(.5, .5).setTint(0xFFFFFF).setDepth(LAYERS.walls);

        setTimeout(() => {
            this.input.keyboard.on('keydown', () => {
                location.reload();
            });
            this.add.text(
                GAME_WIDTH/2, GAME_HEIGHT/2 + 16, 
                "Appuyez sur n'importe quelle touche pour relancer", 
                {fontFamily: 'Arial', fontSize: 24},
            ).setOrigin(.5, .5).setTint(0xFFFFFF).setDepth(LAYERS.walls);
        }, 2000);
    }
}