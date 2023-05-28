import IState from "../../components/State.js";

export class DoorLockedState extends IState {
    constructor() {
        super("door_locked");
    }

    Tick(){
    }

    OnEnterState(){
    }

    OnExitState(){
    }
}

export class DoorUnlockedState extends IState {
    constructor(doorController) {
        super("door_unlocked");
        this._doorController = doorController;
    }

    Tick(){
    }

    OnEnterState(){
    }

    OnExitState(){
    }
}