import Behaviour from "../components/Behaviour.js";

export default class EnemyManager extends Behaviour {
    constructor(gameManager){
        super();
        this._gameManager = gameManager;
        this._stats = {
            damage: 1,
            speed: 1,
            health: 1,
        }
    }

    start(){
        this._scene = this._parent.scene;
        super.start();
    }

    TakeDamage(amount){
        this._stats.health -= amount;
        console.log(amount)
        if(this._stats.health <= 0){
            this._parent.destroy();
        } 
    }

    destroy(){
        // Create new soul pickup
        super.destroy();
    }
}