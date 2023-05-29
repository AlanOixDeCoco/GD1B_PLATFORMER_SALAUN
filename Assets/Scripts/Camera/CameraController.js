import Behaviour from "../components/Behaviour.js";

export default class CameraController extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._circle = this._scene.make.image({x: 0, y: 0, key: "circle_mask", add: false});
        this._circleMask = this._circle.createBitmapMask();

        super.start();
    }

    FadeOut(x, y, callback){
        this._circle.x = x;
        this._circle.y = y;

        this._parent.setMask(this._circleMask);

        var scale = 1;
        this._fadeOutInterval = setInterval(() => {
            this._circle.setScale(scale);
            scale -= .01;
            if(scale <= 0) {
                this._circle.setScale(0);
                clearInterval(this._fadeOutInterval);
                callback();
            }
        }, 5);
    }

    SetFadeOut(){
        this._parent.setMask(this._circleMask);
        this._circle.setScale(0);
    }

    FadeIn(x, y){
        this._circle.x = x;
        this._circle.y = y;

        this._parent.setMask(this._circleMask);

        var scale = 0;
        this._fadeInInterval = setInterval(() => {
            this._circle.setScale(scale);
            scale += .01;
            if(scale >= 1) {
                this._circle.setScale(1);
                clearInterval(this._fadeInInterval);
                this._parent.clearMask();
            }
        }, 5);
    }
}