import CameraController from "../Camera/CameraController.js";
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
        this._gameManager = data.gameManager;
        this._gameManager.SetCurrentScene(this);

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
            maxJumpVelocity: PLAYER_DEFAULT_JUMP_VELOCITY,
            jumpVelocity: PLAYER_DEFAULT_JUMP_VELOCITY,
            maxDashVelocity: PLAYER_DEFAULT_DASH_VELOCITY,
            dashVelocity: PLAYER_DEFAULT_DASH_VELOCITY,
            maxDashDuration: PLAYER_DEFAULT_DASH_DURATION,
            dashDuration: PLAYER_DEFAULT_DASH_DURATION,
            dashAvailableDuration: PLAYER_DEFAULT_DASH_AVAILABLE_DURATION,
        }
    }

    create(){
        this._camera = this.cameras.main;
        this.MakeBehaviors(this._camera, {
            "camera_controller": new CameraController(),
        });

        // create the levelManager
        this._levelManager = this.add.container();
        this.MakeBehaviour(this._levelManager);
        this._levelManager.AddBehaviour(new LevelManager(), "levelManager");

        // create the background
        this.add.image(GAME_WIDTH/2, GAME_HEIGHT/2, 'prototype_background').setOrigin(.5, .5).setDepth(0);
        
        // create the player object and add its behaviors
        this._player = this.physics.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2 + 80, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.MakeBehaviors(this._player, {
            "player_animator": new PlayerAnimator(),
            "player_body": new PlayerBody(),
            "player_manager": new PlayerManager(this._initData.playerStats),
        });

        // create collision between player and platform
        this._player.setCollideWorldBounds(true);

        // activate lights 2D in this scene
        this.lights.enable().setAmbientColor(0xAAAAAA);
    }
}