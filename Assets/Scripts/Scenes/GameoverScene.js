import BehaviourScene from "../Components/BehaviourScene.js";

export default class GameoverScene extends BehaviourScene {
    constructor() {
        super(SCENE_GAMEOVER, false);
    }

    init(data){
        this._gameManager = data.gameManager;
    }

    create(){
        // This game's stats
        const gameStats = this._gameManager._data;
        console.log(gameStats);

        this.add.image(0, 0, SPRITE_KEYS.menu.gameover).setOrigin(0, 0).setDepth(0);

        // Duration
        this.add.text(250, 227, this._gameManager.GetTimeInMinutes(), {fontSize: 28, fontFamily: 'Monogram'})
        .setOrigin(0, .82)
        .setTint(UI_COLORS.dark)
        .setDepth(LAYERS.walls);

        // Floors
        this.add.text(262, 252, this._gameManager._data.floorCount, {fontSize: 28, fontFamily: 'Monogram'})
        .setOrigin(0, .82)
        .setTint(UI_COLORS.dark)
        .setDepth(LAYERS.walls);

        // Souls
        this.add.text(359, 277, this._gameManager._data.souls, {fontSize: 28, fontFamily: 'Monogram'})
        .setOrigin(0, .82)
        .setTint(UI_COLORS.dark)
        .setDepth(LAYERS.walls);

        // Level
        this.add.text(262, 302, this._gameManager._data.playerStats.level, {fontSize: 28, fontFamily: 'Monogram'})
        .setOrigin(0, .82)
        .setTint(UI_COLORS.dark)
        .setDepth(LAYERS.walls);

        // reload text & behaviour
        this._continueText = this.add.text(GAME_WIDTH/2, GAME_HEIGHT - 25, "Appuyez sur n'importe quelle touche pour continuer...", {fontFamily: "Monogram"})
        .setOrigin(.5, 1)
        .setTint(UI_COLORS.light);
        this._continueText.setVisible(false);

        setTimeout(() => {
            this.input.keyboard.on('keydown', () => {
                location.reload();
            });
            this._continueText.setVisible(true);
        }, 2000);
    }
}