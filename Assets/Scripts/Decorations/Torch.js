import Behaviour from "../components/Behaviour.js";

export default class Torch extends Behaviour{
    start(){    
        this._scene = this._parent.scene;
        
        this._baseIntensity = EFFECTS.torchIntensity;

        this._torch = this._scene.lights.addLight(this._parent.x, this._parent.y, EFFECTS.torchRange, EFFECTS.torchColor, this._baseIntensity);
        this._fireSound = this._scene.sound.add(AUDIO_KEYS.torch, {loop: true, volume: VOLUME.torch});

        this._fireSound.play();

        this._randomIntensityInterval = setInterval(() => {
            var randomSign = Math.random() > 0.5 ? 1 : -1;
            this._torch.intensity = this._baseIntensity + (randomSign * (Math.random() * EFFECTS.torchVariationRange));
        }, EFFECTS.torchVariationInterval);

        super.start();
    }

    SetIntensity(intensity){
        this._torch.intensity = intensity;
        this._baseIntensity = intensity;
    }

    destroy(){
        clearInterval(this._randomIntensityInterval);
        this._fireSound.stop();
        this._scene.lights.removeLight(this._torch);
    }
}