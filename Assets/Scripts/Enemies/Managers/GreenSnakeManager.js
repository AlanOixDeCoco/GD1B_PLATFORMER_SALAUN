import StateMachine from "../../components/StateMachine.js";
import EnemyManager from "../EnemyManager.js";

export default class GreenSnakeManager extends EnemyManager {
    start(){
        this._stateMachine = new StateMachine();

        super.start();
    }
}