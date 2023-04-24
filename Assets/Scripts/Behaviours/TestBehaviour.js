import Behaviour from "../Behaviour.js";

export default class TestBehaviour extends Behaviour{
    start(){
        this._parent.body.velocity.x = -10;

        super.start();
    }

    update(time, deltatime){
        
    }

    destroy(){
        console.log(`Deleted ${this._identifier} behaviour!`);
    }
}