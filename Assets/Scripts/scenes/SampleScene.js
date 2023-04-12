export default class SampleScene extends Phaser.Scene {
    constructor() {
        super('scene-sample');
    }

    preload(){
        this.load.image({
            key: 'mecha_side', 
            url: './assets/sprites/mecha_lowres_side.png',
            normalMap: './assets/sprites/mecha_lowres_side_normal.png'
        });

        this.load.image({
            key: 'mecha_angle', 
            url: './assets/sprites/testPixelArt_lowRes.png',
            normalMap: './assets/sprites/testPixelArt_lowRes_normal.png'
        });
    }

    create(){
        this.add.image(64, 128, 'mecha_side').setOrigin(0.5, 0.5).setPipeline('Light2D');

        this.add.image(196, 128, 'mecha_angle').setOrigin(0.5, 0.5).setPipeline('Light2D');

        var light  = this.lights.addLight(0, 0, 100, 0xFF8888);

        this.lights.enable().setAmbientColor(0x222222);

        this.input.on('pointermove', function (pointer) {

            light.x = pointer.x;
            light.y = pointer.y;

        });
    }
}