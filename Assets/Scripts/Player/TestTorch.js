import Behaviour from "../Behaviour.js";

export default class TestTorch extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        // inputs
        this._powerKey = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        this._torch = this._scene.lights.addLight(this._parent.x - 16, this._parent.y - 16, 200, 0xFF8800, 2);

        super.start();
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this._powerKey)) this._torch.visible = !this._torch.visible;
        this._torch.x = this._parent.x - 16;
        this._torch.y = this._parent.y - 16;
    }

    destroy(){
        this._scene.lights.removeLight(this._torch);
    }
}