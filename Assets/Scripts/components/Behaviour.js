export default class Behaviour {
    init(gameobject, identifier){
        this._parent = gameobject;
        this._identifier = identifier;
        this.start();
    }

    start(){
        // At the end of the start function, we should add the behaviour to the updated list of the gameobject
        // if we want it to be updated, by calling super.start() at the inherited behaviour start function end
        this._parent._behaviours[this._identifier] = this;
    }

    update(time, deltatime){
        
    }

    destroy(){

    }
}