import Behaviour from "../components/Behaviour.js";

export default class PlayerAnimator extends Behaviour{
    start(){
        // variables
        this._facingRight = true;

        //#region ANIMATIONS
        //this._parent.anims.create({
        //    key: 'character_idle',
        //    frames: this._parent.anims.generateFrameNames("character_atlas", {
        //        prefix: 'character_idle_right_',
        //        suffix: '.png',
        //        start: 0,
        //        end: 89,
        //        zeroPad: 2
        //    }),
        //    frameRate: 30,
        //    repeat: -1,
        //});
//
        //this._parent.anims.create({
        //    key: 'character_run',
        //    frames: this._parent.anims.generateFrameNames("character_atlas", {
        //        prefix: 'character_run_right_',
        //        suffix: '.png',
        //        start: 0,
        //        end: 19,
        //        zeroPad: 2
        //    }),
        //    frameRate: 30,
        //    repeat: -1,
        //});

        this._parent.anims.create({
            key: 'character_idle',
            frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:0, end:0}),
            frameRate: 30,
            repeat: -1,
        });
        this._parent.anims.create({
            key: 'character_run',
            frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:1, end:1}),
            frameRate: 30,
            repeat: -1,
      });
      this._parent.anims.create({
          key: 'character_jump',
          frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:2, end:2}),
          frameRate: 30,
          repeat: 0,
      });
      this._parent.anims.create({
        key: 'character_jumping',
        frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:3, end:3}),
        frameRate: 30,
        repeat: -1,
    });
    this._parent.anims.create({
      key: 'character_falling',
      frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:4, end:4}),
      frameRate: 30,
      repeat: -1,
  });
        //#endregion

        super.start();
    }
}