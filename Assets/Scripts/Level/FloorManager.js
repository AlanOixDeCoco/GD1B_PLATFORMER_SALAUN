import Behaviour from "../components/Behaviour.js";

export default class FloorManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        super.start();
    }

    SetGameManager(gameManager){
        this._gameManager = gameManager;
    }

    update(){

    }
}