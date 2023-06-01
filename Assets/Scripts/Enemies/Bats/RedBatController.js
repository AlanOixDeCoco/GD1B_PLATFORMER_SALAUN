import Behaviour from "../../components/Behaviour.js";
import StateMachine from "../../components/StateMachine.js";
import { PurpleBatAttackState, PurpleBatMoveState, PurpleBatSpawnState } from "./PurpleBatStates.js";

export default class PurpleBatController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        var batSpawnState = new PurpleBatSpawnState(this);
        var batMoveState = new PurpleBatMoveState(this);
        var batAttackState = new PurpleBatAttackState(this);
        
        this._stateMachine.AddTransition(batSpawnState, batMoveState, () => {
            console.log(this._parent.anims.isPlaying);
            return !this._parent.anims.isPlaying;
        });

        this._stateMachine.AddTransition(batMoveState, batAttackState, () => {
            const horizontalCheck = (Math.abs(this._enemyManager._target.x - this._enemyManager._parent.x) < ENEMIES_BASE_STATS.purpleEnemiesDetectionRadius);
            const verticalCheck = this._enemyManager._target.y > this._enemyManager._parent.y;
            return horizontalCheck && verticalCheck && !this._enemyManager._busy;
        });

        this._stateMachine.AddTransition(batAttackState, batMoveState, () => {
            return !this._enemyManager._busy;
        });
        
        this._stateMachine.SetState(batSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}