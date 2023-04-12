export default class StateMachine{
    constructor(context, defaultState){
        this._context = context;
        this._currentState = defaultState;
    }

    UpdateState(){
        this._currentState.Update();
    }

    SwitchState(nextState){
        var lastState = this._currentState;
        this._currentState = nextState;
        
        lastState.onExitState();
        this._currentState.onEnterState();
    }
}