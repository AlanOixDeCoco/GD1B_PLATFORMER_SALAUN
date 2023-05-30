import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../components/BehaviourScene.js";
import FloorManager from "../Level/FloorManager.js";
import LevelManager from "../Level/FloorManager.js";

export default class DungeonScene extends BehaviourScene {
    constructor() {
        super(SCENE_DUNGEON_FLOOR, false);
    }

    init(data){
        // pass the needed data to create the level
        this._gameManager = data.gameManager;
        this._gameManager.SetCurrentScene(this);
        this._gameManager._paused = false;

        // Groups
        this._enemiesGroup = this.add.group();
        this._platformsGroup = this.add.group();
        this._soulsGroup = this.add.group();
    }

    create(){
        // Camera
        this.MakeBehaviors(this.cameras.main, {
            "camera_controller": new CameraController(),
        });
        this._cameraController = this.cameras.main.GetBehaviour("camera_controller");
        this._cameraController.SetFadeOut();

        // Light 2D pipeline config
        this.lights.enable().setAmbientColor(EFFECTS.ambianceColor);

        // create the Floor manager
        var floorManagerContainer = this.add.container()
        this.MakeBehaviors(floorManagerContainer, {
            "floor_manager": new FloorManager(),
        });
        this._floorManager = floorManagerContainer.GetBehaviour("floor_manager");
        this._floorManager.SetGameManager(this._gameManager);

        // Tilemap
        var mapIndex = this._gameManager._data.floor;
        this._tilemap = this.add.tilemap(MAP_DUNGEON_FLOORS[mapIndex], 0, 0);
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
                    this._playerManager = this.CreatePlayer(spawn.x, spawn.y, this._gameManager)
                    .GetBehaviour("player_manager");
                    break;
                case "enemies":
                    this._floorManager.SetSpawnArea(spawn);
                    break;
                default:
                    console.log("unknown spawn object!");
            }
        });

        // Interact objects
        var interactObjectLayer = this._tilemap.getObjectLayer("Interact");
        interactObjectLayer.objects.forEach(interactObject => {
            switch(interactObject.properties[1].value){
                case "door": 
                    var doorController = this.CreateDoor(interactObject.x, interactObject.y, interactObject.properties[0].value);
                    doorController.SetOpenCallback(() => {
                        this.NextFloor();
                    });
                    doorController.SetPlayer(this._playerManager);
                    this._floorManager.SetExitDoor(doorController);
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

        // Platforms objects
        var platformsObjectLayer = this._tilemap.getObjectLayer("Platforms");
        platformsObjectLayer.objects.forEach(platform => {
            var platform = this.CreatePlatform(platform.x, platform.y, platform.width/32);
            this._platformsGroup.add(platform);
        });

        // Collisions
        this.physics.add.collider(this._layers.platforms, this._playerManager._parent); // Player / ground
        this.physics.add.collider(this._platformsGroup, this._playerManager._parent, () => {}, (platform, player) => { // Player / platforms
            if(this._playerManager._ignorePlatform) return false;
            return player.y < (platform.y + 3);
        });

        this.physics.add.collider(this._layers.platforms, this._enemiesGroup); // Enemies / ground
        this.physics.add.collider(this._platformsGroup, this._enemiesGroup); // Enemies / platforms

        this.physics.add.collider(this._layers.platforms, this._soulsGroup); // Souls / ground
        this.physics.add.collider(this._platformsGroup, this._soulsGroup); // Souls / platforms
        this.physics.add.collider(this._playerManager._parent, this._soulsGroup, (player, soul) => {
            this._gameManager.PickSoul();
            soul.destroy();
        }); // Souls / player

        this.physics.add.overlap(this._enemiesGroup, this._playerManager._parent, (enemy, player) => { // Enemies / player
            console.log("player hits enemy!");
            this._playerManager.TakeDamage(enemy);
        }, (enemy, player) => {
            return !this._playerManager._invincible && enemy.GetBehaviour("enemyManager")._ready;
        });

        // Fade in
        this._cameraController.FadeIn(this._playerManager._parent.x, this._playerManager._parent.y - PLAYER_HEIGHT);


        console.log(this.lights);
    }

    NextFloor(){
        this._floorManager.destroy();
        this.scene.pause();
        this._gameManager._paused = true;
        this._cameraController.FadeOut(this._playerManager._parent.x, this._playerManager._parent.y - PLAYER_HEIGHT, () => {
            setTimeout(() => {
                this.scene.start(this._gameManager.GetNextFloor(), {gameManager: this._gameManager});
            }, 500);
        });
    }
}