// Not an actual Interface (thanks js...)
export default class IState {
    constructor(stateType){
        this._type = stateType;
    }
    Tick(){}
    OnEnterState(){}
    OnExitState(){}
}