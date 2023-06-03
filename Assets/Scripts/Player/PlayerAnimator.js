import Behaviour from "../Components/Behaviour.js";

export default class PlayerAnimator extends Behaviour{
    start(){
        // variables
        this._facingRight = true;

        // Animations
        /*
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
        this._parent.anims.create({
            key: 'character_land',
            frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:5, end:5}),
            frameRate: 30,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_dash',
            frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:6, end:6}),
            frameRate: 30,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_dashing',
            frames: this._parent.anims.generateFrameNumbers("character_placeholder_spritesheet", {start:7, end:7}),
            frameRate: 30,
            repeat: 0,
        });
        */
        this._parent.anims.create({
            key: 'character_idle',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_idle_',
                suffix: '.png',
                start: 0,
                end: 92,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: -1,
        });
        this._parent.anims.create({
            key: 'character_run',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_run_',
                suffix: '.png',
                start: 0,
                end: 46,
                zeroPad: 2
            }),
            frameRate: 80,
            repeat: -1,
        });
        this._parent.anims.create({
            key: 'character_jump',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_jump_',
                suffix: '.png',
                start: 0,
                end: 4,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_jumping',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_jump_',
                suffix: '.png',
                start: 5,
                end: 10,
                zeroPad: 2
            }),
            frameRate: 80,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_falling',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_jump_',
                suffix: '.png',
                start: 11,
                end: 20,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_land',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_jump_',
                suffix: '.png',
                start: 21,
                end: 25,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_dash',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_dash_',
                suffix: '.png',
                start: 0,
                end: 4,
                zeroPad: 2
            }),
            frameRate: 30,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_dashing',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_dash_',
                suffix: '.png',
                start: 4,
                end: 4,
                zeroPad: 2
            }),
            frameRate: 0,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_attackStatic',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_attackStatic_',
                suffix: '.png',
                start: 0,
                end: 14,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_attackRun',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_attackRun_',
                suffix: '.png',
                start: 0,
                end: 20,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        this._parent.anims.create({
            key: 'character_attackJump',
            frames: this._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_attackJump_',
                suffix: '.png',
                start: 0,
                end: 13,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
        //#endregion

        super.start();
    }
}