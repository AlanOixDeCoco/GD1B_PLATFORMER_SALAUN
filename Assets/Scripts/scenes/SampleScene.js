export default class SampleScene extends Phaser.Scene {
    constructor() {
        super('scene-sample');

        this._playerSpeed = 128;
    }

    preload(){
        this.load.image({
            key: 'test_background', 
            url: './assets/sprites/test_background.png',
            normalMap: './assets/sprites/test_background_n.png'
        });

        this.load.image({
            key: 'test_platform', 
            url: './assets/sprites/test_platform.png',
            //normalMap: './assets/sprites/test_background_n.png'
        });

        this.load.atlas({
            key: 'character_atlas',
            textureURL: './assets/sprites/character_atlas.png',
            normalMap: './assets/sprites/character_atlas_n.png',
            atlasURL: './assets/sprites/character_atlas.json'
        });
    }

    create(){
        // Animations
        this.anims.create({
            key: 'character_idle_right',
            frames: this.anims.generateFrameNames("character_atlas", {
              prefix: 'character_idle_right_',
              suffix: '.png',
              start: 0,
              end: 89,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: 'character_idle_left',
            frames: this.anims.generateFrameNames("character_atlas", {
              prefix: 'character_idle_left_',
              suffix: '.png',
              start: 0,
              end: 89,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });

        this.anims.create({
            key: 'character_run_right',
            frames: this.anims.generateFrameNames("character_atlas", {
              prefix: 'character_run_right_',
              suffix: '.png',
              start: 0,
              end: 19,
              zeroPad: 2
            }),
            frameRate: 30,
            repeat: -1,
        });
        this.anims.create({
            key: 'character_run_left',
            frames: this.anims.generateFrameNames("character_atlas", {
                prefix: 'character_run_left_',
                suffix: '.png',
                start: 0,
                end: 19,
                zeroPad: 2
              }),
            frameRate: 30,
            repeat: -1,
        });

        this.add.image(0, 0, 'test_background').setOrigin(0, 0).setPipeline('Light2D').setDepth(0);

        var platform = this.physics.add.sprite(256, 288, 'test_platform').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        platform.setImmovable(true);
        platform.body.allowGravity = false;

        this.testCharacter = this.physics.add.sprite(256, 270, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.testCharacter.facingRight = true;

        platform.setGravity(0);
        this.physics.add.collider(platform, this.testCharacter);


        // Lights
        this.spotlight = this.lights.addLight(128, 128, 200, 0xFF8800, 2);

        this.input.on('pointermove', function (pointer) {
            this.context.spotlight.x = pointer.x;
            this.context.spotlight.y = pointer.y;
            
        }).context = this;

        this.lights.enable()//.setAmbientColor(0x888888);

        // inputs
        this._movementKeys = this.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE, 
            jump_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });
    }

    update(){
        var horizontalMove = (this._movementKeys.left.isDown * -1) + (this._movementKeys.right.isDown * 1);
        horizontalMove *= this._playerSpeed;
        this.testCharacter.setVelocityX(horizontalMove, this.testCharacter.body.velocity.y);

        //#region horizontal movement
        if(this.testCharacter.body.velocity.x < 0){
            this.testCharacter.anims.play("character_run_left", true);
            this.testCharacter.facingRight = false;
        }

        if(this.testCharacter.body.velocity.x > 0){
            this.testCharacter.anims.play("character_run_right", true);
            this.testCharacter.facingRight = true;
        }

        if(this.testCharacter.body.velocity.x == 0){
            if(this.testCharacter.facingRight) this.testCharacter.anims.play("character_idle_right", true);
            else this.testCharacter.anims.play("character_idle_left", true);
        }
        //#endregion

        //#region jump
        if(this._movementKeys.jump.isDown && !this.testCharacter.isJumping){
            this.testCharacter.body.setVelocityY(-150);
        }
        //#endregion

        this.testCharacter.isJumping = !this.testCharacter.body.blocked.down;
    }
}