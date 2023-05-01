const emptyTransitions = [];

export default class StateMachine{
    constructor(){
        this._currentState = null;
        this._transitions = {};
        this._currentTransitions = [];
        this._anyTransitions = [];
    }

    Tick(){
        var transition = this.GetTransition();
        if(transition != null){
            this.SetState(transition._stateTo);
        } 

        this._currentState?.Tick();
    }

    SetState(state){
        if(state == this._currentState) return;

        this._currentState?.OnExitState();
        this._lastState = this._currentState;
        this._currentState = state;

       this._currentTransitions = this._transitions[this._currentState._type];
       if(this._currentTransitions == null) this._currentTransitions = emptyTransitions;

       this._currentState.OnEnterState();
    }

    AddTransition(stateFrom, stateTo, predicate){
        if(this._transitions[stateFrom._type] == null){
            this._transitions[stateFrom._type] = [];
        }
        this._transitions[stateFrom._type].push(new Transition(stateTo, predicate));
    }

    AddAnyTransition(stateTo, predicate){
        this._anyTransitions.push(new Transition(stateTo, predicate));
    }

    GetTransition(){
        for(var transitionID in this._anyTransitions){
            if(this._anyTransitions[transitionID]._predicate()) return this._anyTransitions[transitionID];
        }

        for(var transitionID in this._currentTransitions){
            if(this._currentTransitions[transitionID]._predicate()) return this._currentTransitions[transitionID];
        }

        return null;
    }
}

class Transition {
    constructor(stateTo, predicate){
        this._stateTo = stateTo;
        this._predicate = predicate;
    }
}