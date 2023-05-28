import Behaviour from "../components/Behaviour.js";

export default class PlayerAura extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._aura = this._scene.lights.addLight(this._parent.x, this._parent.y - 38, EFFECTS.auraRange, EFFECTS.auraColor, EFFECTS.auraIntensity);

        super.start();
    }

    update(){
        this._aura.x = this._parent.x;
        this._aura.y = this._parent.y - 38;
    }

    destroy(){
        this._scene.lights.removeLight(this._aura);
    }
}