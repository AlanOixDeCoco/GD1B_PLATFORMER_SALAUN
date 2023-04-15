export default class SampleScene extends Phaser.Scene {
    constructor() {
        super('scene-sample');
    }

    preload(){
        this.load.image({
            key: 'test_background', 
            url: './assets/sprites/test_background.png',
            normalMap: './assets/sprites/test_background_n.png'
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

        this.testCharacter = this.add.sprite(256, 274, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.testCharacter.anims.play("character_run_left");

        // Lights
        this.spotlight = this.lights.addLight(128, 128, 200, 0xFF8800, 2);

        this.input.on('pointermove', function (pointer) {
            this.context.spotlight.x = pointer.x;
            this.context.spotlight.y = pointer.y;
            
        }).context = this;

        this.lights.enable()//.setAmbientColor(0x888888);
    }
}