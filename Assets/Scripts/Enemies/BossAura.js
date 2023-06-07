import Behaviour from "../Components/Behaviour.js";

export default class BossAura extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._aura = this._scene.lights.addLight(this._parent.x, this._parent.y - 48, EFFECTS.bossAuraRange, EFFECTS.bossAuraColor, EFFECTS.bossAuraIntensity);

        super.start();
    }

    update(){
        this._aura.x = this._parent.x;
        this._aura.y = this._parent.y - 48;
    }

    destroy(){
        this._scene.lights.removeLight(this._aura);
    }
}