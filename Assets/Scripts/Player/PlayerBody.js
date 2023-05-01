import Behaviour from "../Behaviour.js";

export default class PlayerBody extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        // edit the player character body
        this._parent.body.setSize(32, 32);
        this._parent.body.setOffset(0, 0);

        this._destroyKey = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        super.start();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this._destroyKey)) this._parent.destroy();
    }
}