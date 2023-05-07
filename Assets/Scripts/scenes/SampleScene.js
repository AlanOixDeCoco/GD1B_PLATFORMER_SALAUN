import BehaviourScene from "../components/BehaviourScene.js";
import LevelManager from "../Level/FloorManager.js";
import PlayerAnimator from "../Player/PlayerAnimator.js";
import PlayerBody from "../Player/PlayerBody.js";
import PlayerManager from "../Player/PlayerManager.js";

export default class SampleScene extends BehaviourScene {
    constructor() {
        super('sample_scene', false);
    }

    init(data){
        // pass the needed data to create the level
        this._initData = data;

        // should be passed in the init function data
        this._initData.floor = 1;
        this._initData.playerStats = {
            level: 1,
            experience: 0,
            skills: [],
            maxHealth: PLAYER_DEFAULT_HEALTH,
            health: PLAYER_DEFAULT_HEALTH,
            maxSpeed: PLAYER_DEFAULT_SPEED,
            speed: PLAYER_DEFAULT_SPEED,
        }
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

        this.load.spritesheet({
            key: "character_placeholder_spritesheet",
            url: './assets/sprites/characters/player/character_placeholder_spritesheet.png',
            frameConfig: {frameWidth: 32}
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
        this._player = this.physics.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2 + 80, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.MakeBehaviors(this._player, {
            "player_animator": new PlayerAnimator(),
            "player_body": new PlayerBody(),
            "player_manager": new PlayerManager(this._initData.playerStats),
        });

        // create collision between player and platform
        this.physics.add.collider(this._player, platform);

        // activate lights 2D in this scene
        this.lights.enable().setAmbientColor(0xAAAAAA);
    }
}