import BehaviourScene from "../BehaviourScene.js";
import LevelManager from "../Level/FloorManager.js";

export default class DungeonScene extends BehaviourScene {
    constructor() {
        super(SCENE_DUNGEON_FLOOR, false);
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
        // load the corresponding tilemap (or generate one) --> Use _initData.floor value
        
    }

    create(){
        // create the levelManager
        this._levelManager = this.add.container();
        this.MakeBehaviors(this._levelManager, {
            "level_manager": new LevelManager(),
        });
    }
}