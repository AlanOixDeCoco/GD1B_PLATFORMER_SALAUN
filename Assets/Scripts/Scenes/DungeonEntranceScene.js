import CameraController from "../Camera/CameraController.js";
import Torch from "../Decorations/Torch.js";
import SoundManager from "../Level/SoundManager.js";
import PlayerAnimator from "../Player/PlayerAnimator.js";
import PlayerBody from "../Player/PlayerBody.js";
import PlayerManager from "../Player/PlayerManager.js";
import BehaviourScene from "../components/BehaviourScene.js";

export default class DungeonEntranceScene extends BehaviourScene {
    constructor() {
        super(SCENE_DUNGEON_ENTRANCE, false);
    }

    init(data){
        this._gameManager = data.gameManager;
        this._gameManager.SetCurrentScene(this);

        // pass the needed data to create the level
        this._initData = data;

        // should be passed in the init function data
        this._initData.floor = 0;
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
            dashRecoverTime: PLAYER_DEFAULT_DASH_RECOVER_TIME,
        }
    }

    create(){
        // Camera
        this.MakeBehaviors(this.cameras.main, {
            "camera_controller": new CameraController(),
        });
        this._cameraController = this.cameras.main.GetBehaviour("camera_controller");

        // Tilemap
        this._tilemap = this.add.tilemap(MAP_DUNGEON_ENTRANCE, 0, 0);
        this._tileset = this._tilemap.addTilesetImage("tileset", TILESET_00);
        this._layers = {
            background: this._tilemap.createLayer(
                "Background",
                this._tileset,
            ).setDepth(LAYERS.walls),
            walls: this._tilemap.createLayer(
                "Walls",
                this._tileset,
            ).setDepth(LAYERS.walls).setPipeline('Light2D'),
            platforms: this._tilemap.createLayer(
                "Platforms",
                this._tileset,
            ).setDepth(LAYERS.ground).setCollisionByProperty({collides: true})
        };

        // Spawns
        var spawnsObjectLayer = this._tilemap.getObjectLayer("Spawns");
        spawnsObjectLayer.objects.forEach(spawn => {
            switch(spawn.properties[0].value){
                case "player": 
                    this._playerManager = this.CreatePlayer(spawn.x, spawn.y, this._initData.playerStats)
                    .GetBehaviour("player_manager");
                    break;
                default:
                    console.log("unknown interact object!");
            }
        });

        // Interact objects
        var interactObjectLayer = this._tilemap.getObjectLayer("Interact");
        interactObjectLayer.objects.forEach(interactObject => {
            switch(interactObject.properties[1].value){
                case "door": 
                    var doorController = this.CreateDoor(interactObject.x, interactObject.y, interactObject.properties[0].value);
                    doorController.SetOpenCallback(() => {
                        this.StartDungeonTransitionScene();
                    });
                    doorController.SetPlayer(this._playerManager);
                    break;
                case "decorativeDoor":
                    this.CreateDecorativeDoor(interactObject.x, interactObject.y);
                    break;
                case "sign": 
                    this.CreateSign(interactObject.x, interactObject.y, interactObject.properties[0].value);
                    break;
                case "torch": 
                    this.CreateTorch(interactObject.x, interactObject.y, interactObject.properties[0].value);
                    break;
                default:
                    console.log("unknown interact object!");
            }
        });

        // Collisions
        this.physics.add.collider(this._layers.platforms, this._playerManager._parent);
        
        // activate lights 2D in this scene
        this.lights.enable().setAmbientColor(EFFECTS.ambianceColor);
    }

    StartDungeonTransitionScene(){
        this.scene.pause();
        this._cameraController.FadeOut(this._playerManager._parent.x, this._playerManager._parent.y - PLAYER_HEIGHT, () => {
            setTimeout(() => {
                this.scene.start(SCENE_DUNGEON_FLOOR, this._initData);
            }, 500);
        });
    }
}