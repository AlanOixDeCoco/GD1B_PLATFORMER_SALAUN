import Behaviour from "../components/Behaviour.js";

export default class EnemyAura extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._aura = this._scene.lights.addLight(this._parent.x, this._parent.y - 16, EFFECTS.enemyAuraRange, EFFECTS.enemyAuraColor, EFFECTS.enemyAuraIntensity);

        super.start();
    }

    update(){
        this._aura.x = this._parent.x;
        this._aura.y = this._parent.y - 16;
    }

    destroy(){
        this._scene.lights.removeLight(this._aura);
    }
}