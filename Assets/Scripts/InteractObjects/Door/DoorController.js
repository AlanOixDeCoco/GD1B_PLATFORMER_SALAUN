import Behaviour from "../../components/Behaviour.js";

export default class DoorController extends Behaviour{
    start(){
        this._scene = this._parent.scene;

        this._locked = true;

        this._interactUI = this._scene.add.sprite(this._parent.x + (this._parent.width/2), this._parent.y, "");
        this._interactUI.setDepth(LAYERS.interactObjects + 1).setOrigin(.5, 1);
        this._interactUI.setVisible(false);

        //#region Animations
        this._parent.anims.create({
            key: ANIMATIONS_KEYS.doorUnlock,
            frames: this._parent.anims.generateFrameNames("environment_atlas", {
                prefix: 'door_',
                suffix: '.png',
                start: 0,
                end: 1,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: ANIMATIONS_KEYS.doorUnlocked,
            frames: this._parent.anims.generateFrameNames("environment_atlas", {
                prefix: 'door_',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 2
            }),
            frameRate: 0,
            repeat: 0,
        });
        this._parent.anims.create({
            key: ANIMATIONS_KEYS.doorOpen,
            frames: this._parent.anims.generateFrameNames("environment_atlas", {
                prefix: 'door_',
                suffix: '.png',
                start: 2,
                end: 2,
                zeroPad: 2
            }),
            frameRate: 0,
            repeat: 0,
        });
        //#endregion

        super.start();
    }

    SetUnlocked(){
        this._parent.anims.play(ANIMATIONS_KEYS.doorUnlocked);
        this._locked = false;
        this._interactUI.setVisible(true);
    }

    Unlock(){
        this._parent.anims.play(ANIMATIONS_KEYS.doorUnlock);
        this._scene.sound.play(AUDIO_KEYS.doorUnlock, {volume: VOLUME.door, loop: false});
        this._locked = false;
        this._interactUI.setVisible(true);
    }

    Open(){
        this._interactUI.setVisible(false);
        this._parent.anims.play(ANIMATIONS_KEYS.doorOpen, true);
        this._scene.sound.play(AUDIO_KEYS.doorOpen, {volume: VOLUME.door, loop: false});
        this._openCallback();
    }

    SetOpenCallback(callback){
        this._openCallback = callback;
    }

    SetPlayer(playerManager){
        this._scene.physics.add.overlap(this._parent, playerManager._parent, () => {
            if(playerManager._interact){
                console.log("Interact with door!");
                this.Open();
            }
        }, () => {
            return !this._locked;
        });
    }
}