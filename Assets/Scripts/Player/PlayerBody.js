import Behaviour from "../components/Behaviour.js";

export default class PlayerBody extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        // edit the player character body
        this._parent.body.setSize(18, 32);
        this._parent.body.setOffset(23, 32);

        super.start();
    }
}