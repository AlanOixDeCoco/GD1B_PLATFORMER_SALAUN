import Behaviour from "../../Components/Behaviour.js";
import StateMachine from "../../Components/StateMachine.js";
import { RedBatAttackState, RedBatMoveState, RedBatSpawnState } from "./RedBatStates.js";

export default class RedBatController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        var batSpawnState = new RedBatSpawnState(this);
        var batMoveState = new RedBatMoveState(this);
        var batAttackState = new RedBatAttackState(this);
        
        this._stateMachine.AddTransition(batSpawnState, batMoveState, () => {
            return !this._parent.anims.isPlaying;
        });

        this._stateMachine.AddTransition(batMoveState, batAttackState, () => {
            const horizontalCheck = (Math.abs(this._enemyManager._target.x - this._enemyManager._parent.x) < ENEMIES_BASE_STATS.redEnemiesDetectionRadius);
            const verticalCheck = (Math.abs(this._enemyManager._target.y - this._enemyManager._parent.y) < ENEMIES_BASE_STATS.redEnemiesDetectionRadius);
            return horizontalCheck && verticalCheck;
        });
        
        this._stateMachine.SetState(batSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}