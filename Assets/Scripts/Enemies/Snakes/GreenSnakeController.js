import Behaviour from "../../components/Behaviour.js";
import StateMachine from "../../components/StateMachine.js";
import { GreenSnakeMoveState, GreenSnakeSpawnState } from "./GreenSnakeStates.js";

export default class GreenSnakeController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        var snakeSpawnState = new GreenSnakeSpawnState(this);
        var snakeMoveState = new GreenSnakeMoveState(this);
        
        this._stateMachine.AddTransition(snakeSpawnState, snakeMoveState, () => {
            return !this._parent.anims.isPlaying;
        });
        
        this._stateMachine.SetState(snakeSpawnState);

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}