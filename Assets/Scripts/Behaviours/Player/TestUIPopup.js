import Behaviour from "../../Behaviour.js";

export default class TestUIPopup extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._uiPopup = this._scene.add.image(this._parent.x, this._parent.y - 96, "").setOrigin(.5, 1);

        super.start();
    }

    update(){
        this._uiPopup.setPosition(this._parent.x, this._parent.y - 96);
    }

    destroy(){
        this._uiPopup.destroy();
    }
}