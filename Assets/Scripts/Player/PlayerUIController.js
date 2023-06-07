import Behaviour from "../Components/Behaviour.js";

export default class PlayerUIController extends Behaviour {
    constructor(gameManager) {
        super();
        this._gameManager = gameManager;
    }

    start(){
        this._scene = this._parent.scene;

        // Experience
        const playerExpShell = this._scene.add.sprite(320, 64, "player_ui_atlas", "exp_shell.png");
        playerExpShell.setDepth(LAYERS.overlayUI).setOrigin(.5, .5);

        this._playerExpMaskImage = this._scene.add.sprite(159, 64, "player_ui_atlas", "exp_mask.png");
        this._playerExpMaskImage.setOrigin(.5, .5);
        const playerExpMask = this._playerExpMaskImage.createBitmapMask();

        this._playerExpFill = this._scene.add.image(320, 64, "player_ui_atlas", "exp_fill.png");
        this._playerExpFill.setDepth(LAYERS.overlayUI + 1).setOrigin(.5, .5);
        this._playerExpFill.setMask(playerExpMask);

        this._currentLevelText = this._scene.add.bitmapText(
            145, 
            62, 
            "CursedScript",
            this._gameManager._data.playerStats.level,
            this._gameManager._data.playerStats.level < 10 ? 24 : 12
        ).setDepth(LAYERS.overlayUI + 1).setOrigin(.5, .5);

        this._nextLevelText = this._scene.add.bitmapText(
            497, 
            62, 
            "CursedScript",
            this._gameManager._data.playerStats.level + 1,
            this._gameManager._data.playerStats.level + 1 < 10 ? 24 : 12
        ).setDepth(LAYERS.overlayUI + 1).setOrigin(.5, .5);
        
        // Health
        const playerHealthShell = this._scene.add.sprite(320, GAME_HEIGHT - 32, "player_ui_atlas", "hp_shell.png");
        playerHealthShell.setDepth(LAYERS.overlayUI).setOrigin(.5, .5);

        this._playerHealthMaskImage = this._scene.add.sprite(53, GAME_HEIGHT - 32, "player_ui_atlas", "hp_mask.png");
        this._playerHealthMaskImage.setOrigin(.5, .5);
        const playerHealthMask = this._playerHealthMaskImage.createBitmapMask();

        this._playerHealthFill = this._scene.add.image(335, GAME_HEIGHT - 32, "player_ui_atlas", "hp_fill.png");
        this._playerHealthFill.setDepth(LAYERS.overlayUI + 1).setOrigin(.5, .5);
        this._playerHealthFill.setMask(playerHealthMask);

        this.UpdateExperienceFill();
        this.UpdateHealthFill();

        super.start();
    }

    update(){
        const x = this._scene.input.mousePointer.x;
        this._playerExpMaskImage.setVisible(false);
        this._playerHealthMaskImage.setVisible(false);
    }

    ShowUI(){
        this._playerExpFill.setVisible(true);
        this._playerHealthFill.setVisible(true);
    }

    HideUI(){
        this._playerExpFill.setVisible(false);
        this._playerHealthFill.setVisible(false);
    }

    UpdateExperienceFill(){
        const expRatio = this._gameManager._data.playerStats.experience / this._gameManager._data.playerStats.experienceNeeded;
        const experienceMaskX = (324 * expRatio) - 4; // -165 --> 159 (324)
        this._playerExpMaskImage.x = experienceMaskX;

        this._currentLevelText.text = this._gameManager._data.playerStats.level;
        this._nextLevelText.text = this._gameManager._data.playerStats.level + 1;
    }

    UpdateHealthFill(){
        const healthRatio = this._gameManager._data.playerStats.health / this._gameManager._data.playerStats.maxHealth;
        const healthMaskX = (106 * healthRatio) + 230; // -165 --> 159 (324)
        this._playerHealthMaskImage.x = healthMaskX;
    }
}