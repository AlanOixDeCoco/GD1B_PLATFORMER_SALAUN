import Behaviour from "../components/Behaviour.js";

export default class SoundManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        // Play owl ambiance sound
        this._ambianceOwlSound = this._scene.sound.add(AUDIO_KEYS.ambianceOwl, {loop: true, volume: VOLUME.ambianceOwl});
        this._ambianceOwlSound.play();

        super.start();
    }
}