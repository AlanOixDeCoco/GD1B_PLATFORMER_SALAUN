import BehaviourScene from "../BehaviourScene.js";
import LevelManager from "../Behaviours/Level/LevelManager.js";
import PlayerAnimator from "../Behaviours/Player/PlayerAnimator.js";
import PlayerInput from "../Behaviours/Player/PlayerInput.js";

export default class SampleScene extends BehaviourScene {
    constructor() {
        super('sample_scene', false);
        this._playerSpeed = 128;
    }

    preload(){
        this.load.image({
            key: 'test_background',
            url: './assets/sprites/test_background.png',
            normalMap: './assets/sprites/test_background_n.png'
        });

        this.load.image({
            key: 'test_platform',
            url: './assets/sprites/test_platform.png',
            //normalMap: './assets/sprites/test_platform.png'
        });

        this.load.atlas({
            key: 'character_atlas',
            textureURL: './assets/sprites/characters/player/character_atlas.png',
            normalMap: './assets/sprites/characters/player/character_atlas_n.png',
            atlasURL: './assets/sprites/characters/player/character_atlas.json'
        });
    }

    create(){
        // create the levelManager
        this._levelManager = this.add.container();
        this.MakeBehaviour(this._levelManager);
        this._levelManager.AddBehaviour(new LevelManager(), "levelManager");

        // create the background
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, 'test_background').setOrigin(.5, .5).setPipeline('Light2D').setDepth(0);

        // create a platform
        var platform = this.physics.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2 + 144, 'test_platform').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        platform.setImmovable(true);
        platform.body.allowGravity = false;
        platform.setGravity(0);
        
        // create the player object and add its behaviors
        this.testCharacter = this.physics.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2 + 112, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.MakeBehaviour(this.testCharacter);
        this.testCharacter.AddBehaviour(new PlayerInput(), "playerInput");
        this.testCharacter.AddBehaviour(new PlayerAnimator(), "playerAnimator");

        // create collision between player and platform
        this.physics.add.collider(this.testCharacter, platform);

        // create lights & assign mouse movement events
        this.spotlight = this.lights.addLight(128, 128, 200, 0xFF8800, 2);

        this.input.on('pointermove', function (pointer) {
            this.context.spotlight.x = pointer.x;
            this.context.spotlight.y = pointer.y;
        }).context = this;

        this.lights.enable().setAmbientColor(0xAAAAAA);
    }
}