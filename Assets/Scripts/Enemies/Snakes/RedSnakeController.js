import Behaviour from "../../Components/Behaviour.js";
import StateMachine from "../../Components/StateMachine.js";
import { RedSnakeAttackState, RedSnakePatrolState, RedSnakeSpawnState } from "./RedSnakeStates.js";

export default class RedSnakeController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        var snakeSpawnState = new RedSnakeSpawnState(this);
        var snakePatrolState = new RedSnakePatrolState(this);
        var snakeAttackState = new RedSnakeAttackState(this);
        
        // Spawn --> Patrol
        this._stateMachine.AddTransition(snakeSpawnState, snakePatrolState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Patrol --> Attack
        this._stateMachine.AddTransition(snakePatrolState, snakeAttackState, () => {
            const direction = this._parent.body.velocity.x > 0 ? 1 : -1;
            const directionVerif = (this._enemyManager._target.x - this._parent.x) * direction > 0;
            const rangeVerif = Math.abs(this._enemyManager._target.x - this._parent.x) < ENEMIES_BASE_STATS.redEnemiesDetectionRadius;
            const verticalAxisVerif = Math.abs(this._enemyManager._target.y - this._parent.y) < 32;
            return rangeVerif && verticalAxisVerif;
        });

        // Attack --> Patrol
        this._stateMachine.AddTransition(snakeAttackState, snakePatrolState, () => {
            const direction = this._parent.body.velocity.x > 0 ? 1 : -1;
            const directionVerif = (this._enemyManager._target.x - this._parent.x) * direction > 0;
            const rangeVerif = Math.abs(this._enemyManager._target.x - this._parent.x) < ENEMIES_BASE_STATS.redEnemiesDetectionRadius;
            const verticalAxisVerif = Math.abs(this._enemyManager._target.y - this._parent.y) < 32;
            return !(rangeVerif && verticalAxisVerif);
        });
        
        this._stateMachine.SetState(snakeSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}