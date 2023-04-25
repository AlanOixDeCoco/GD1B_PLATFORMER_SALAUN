import Behaviour from "../../Behaviour.js";

export default class PlayerAnimator extends Behaviour{
    start(){
        // variables
        this._facingRight = true;

        //#region ANIMATIONS
        this._parent.anims.create({
            key: 'character_idle_right',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
              prefix: 'character_idle_right_',
              suffix: '.png',
              start: 0,
              end: 89,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
        this._parent.anims.create({
            key: 'character_idle_left',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
              prefix: 'character_idle_left_',
              suffix: '.png',
              start: 0,
              end: 89,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });

        this._parent.anims.create({
            key: 'character_run_right',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
              prefix: 'character_run_right_',
              suffix: '.png',
              start: 0,
              end: 19,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
        this._parent.anims.create({
            key: 'character_run_left',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_run_left_',
                suffix: '.png',
                start: 0,
                end: 19,
                zeroPad: 2
              }),
            frameRate: 30,
            repeat: -1,
        });
        //#endregion

        super.start();
    }

    update(){
        //#region horizontal movement
        if(this._parent.body.velocity.x < 0){
            this._parent.anims.play("character_run_left", true);
            this._facingRight = false;
        }

        if(this._parent.body.velocity.x > 0){
            this._parent.anims.play("character_run_right", true);
            this._facingRight = true;
        }

        if(this._parent.body.velocity.x == 0){
            if(this._facingRight) this._parent.anims.play("character_idle_right", true);
            else this._parent.anims.play("character_idle_left", true);
        }
        //#endregion
    }
}