export default class State {
    constructor(context){
        this._context = context;
    }

    onEnterState(previousState){

    }

    Update(){

    }

    onExitState(nextState){
        delete this;
    }
}