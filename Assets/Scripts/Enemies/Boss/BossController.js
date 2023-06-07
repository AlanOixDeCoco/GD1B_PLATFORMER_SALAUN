import Behaviour from "../../Components/Behaviour.js";
import StateMachine from "../../Components/StateMachine.js";
import { BossGreenMoveState, BossPurpleAttackState, BossPurpleMoveState, BossSpawnState, BossTransitionState } from "./BossStates.js";

export default class BossController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
        this._enemyManager._attackUI.setDisplaySize(64, 64);
        this._enemyManager._attackUI.setOrigin(.5, 2);
    }

    start(){
        this._stateMachine = new StateMachine();

        var bossSpawnState = new BossSpawnState(this);
        var bossTransitionState = new BossTransitionState(this); // when it goes from one state to another
        var bossGreenMoveState = new BossGreenMoveState(this); // when it moves (green state)
        var bossPurpleMoveState = new BossPurpleMoveState(this); // when it moves (purple state)
        var bossPurpleAttackState = new BossPurpleAttackState(this); // when it attacks (purple state)
        
        this._stateMachine.AddTransition(bossSpawnState, bossTransitionState, () => {
            return !this._parent.anims.isPlaying;
        });

        this._stateMachine.AddTransition(bossTransitionState, bossGreenMoveState, () => {
            const healthRatio = (this._enemyManager._stats.health / this._enemyManager._stats.initialHealth);
            return this._enemyManager._ready && (healthRatio >= (2/3));
        });

        this._stateMachine.AddTransition(bossGreenMoveState, bossTransitionState, () => {
            const healthRatio = (this._enemyManager._stats.health / this._enemyManager._stats.initialHealth);
            return (healthRatio < (2/3));
        });

        this._stateMachine.AddTransition(bossTransitionState, bossPurpleMoveState, () => {
            const healthRatio = (this._enemyManager._stats.health / this._enemyManager._stats.initialHealth);
            return this._enemyManager._ready && (healthRatio >= (1/3));
        });

        this._stateMachine.AddTransition(bossPurpleMoveState, bossPurpleAttackState, () => {
            const horizontalCheck = (Math.abs(this._enemyManager._target.x - this._enemyManager._parent.x) < ENEMIES_BASE_STATS.purpleEnemiesDetectionRadius * 3);
            const verticalCheck = this._enemyManager._target.y > this._enemyManager._parent.y;
            return horizontalCheck && verticalCheck && !this._enemyManager._busy;
        });

        this._stateMachine.AddTransition(bossPurpleAttackState, bossPurpleMoveState, () => {
            return !this._enemyManager._busy;
        });
        
        this._stateMachine.SetState(bossSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}