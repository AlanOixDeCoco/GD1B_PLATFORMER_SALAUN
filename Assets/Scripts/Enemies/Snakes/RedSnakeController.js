import Behaviour from "../../components/Behaviour.js";
import StateMachine from "../../components/StateMachine.js";

export default class RedSnakeController extends Behaviour {
    constructor(enemyManager){
        super();
        this._enemyManager = enemyManager;
    }

    start(){
        this._stateMachine = new StateMachine();

        this._enemyManager._ready = true;

        super.start();
    }

    update(){
        this._stateMachine.Tick();
    }
}