import Behaviour from "../../Components/Behaviour.js";
import StateMachine from "../../Components/StateMachine.js";
import { GreenBatMoveState, GreenBatSpawnState } from "./GreenBatStates.js";

export default class GreenBatController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        var batSpawnState = new GreenBatSpawnState(this);
        var batMoveState = new GreenBatMoveState(this);
        
        this._stateMachine.AddTransition(batSpawnState, batMoveState, () => {
            return !this._parent.anims.isPlaying;
        });
        
        this._stateMachine.SetState(batSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}