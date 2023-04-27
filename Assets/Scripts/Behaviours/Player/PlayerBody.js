import Behaviour from "../../Behaviour.js";

export default class PlayerBody extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        // edit the player character body
        this._parent.body.setSize(32, 32);
        this._parent.body.setOffset(16, 32);

        // add the head body
        this._head = this._scene.physics.add.sprite(this._parent.x, this._parent.y - 48, "");
        this._head.body.allowGravity = false;
        this._head.setDisplaySize(16, 16);
        this._head.setOrigin(.5, 1);
        this._head.setVisible(false);

        this.key = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        super.start();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.key)) this._parent.destroy();

        this._head.x = this._parent.x;
        this._head.y = this._parent.y - 48;
    }

    destroy(){
        this._head.destroy();
    }
}