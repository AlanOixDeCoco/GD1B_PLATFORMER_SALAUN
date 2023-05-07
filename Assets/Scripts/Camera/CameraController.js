import Behaviour from "../components/Behaviour.js";

export default class CameraController extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._circle = this._scene.make.image({x: 0, y: 0, key: "circle_mask", add: false});
        this._circleMask = this._circle.createBitmapMask();

        this._fadeOutKey = this._scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        super.start();
    }

    FadeOut(x, y){
        this._circle.x = x;
        this._circle.y = y;

        this._parent.setMask(this._circleMask);

        var scale = 1;
        this._fadeOutInterval = setInterval(() => {
            this._circle.setScale(scale);
            scale -= .05;
            if(scale <= 0) {
                this._circle.setScale(0);
                clearInterval(this._fadeOutInterval);
            }
        }, 15);
    }

    FadeIn(x, y){
        this._circle.x = x;
        this._circle.y = y;

        var scale = 0;
        this._fadeInInterval = setInterval(() => {
            this._circle.setScale(scale);
            scale += .05;
            if(scale >= 1) {
                this._circle.setScale(1);
                clearInterval(this._fadeInInterval);
                this._parent.clearMask();
            }
        }, 15);
    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this._fadeOutKey)) {
            this.FadeOut(700, GAME_HEIGHT/2);
            setTimeout(() => {
                this.FadeIn(200, GAME_HEIGHT/2);
            }, 500)
        }
    }
}