import BehaviourScene from "../BehaviourScene.js";
import PlayerAnimator from "../Behaviours/PlayerAnimator.js";
import PlayerInput from "../Behaviours/PlayerInput.js";

export default class SampleScene extends BehaviourScene {
    constructor() {
        super('sample_scene', false);
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
            normalMap: './assets/sprites/test_platform.png'
        });

        this.load.atlas({
            key: 'character_atlas',
            textureURL: './assets/sprites/character_atlas.png',
            normalMap: './assets/sprites/character_atlas_n.png',
            atlasURL: './assets/sprites/character_atlas.json'
        });

        this.load.bitmapFont('CursedScript', 'Assets/Fonts/CursedScript.png', 'Assets/Fonts/CursedScript.fnt');
    }

    create(){
        // create the background
        this.add.image(0, 0, 'test_background').setOrigin(0, 0).setPipeline('Light2D').setDepth(0);

        // create a platform
        var platform = this.physics.add.sprite(256, 288, 'test_platform').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        platform.setImmovable(true);
        platform.body.allowGravity = false;
        platform.setGravity(0);
        
        // create the player object and add its behaviors
        this.testCharacter = this.physics.add.sprite(256, 270, 'character_atlas').setOrigin(0.5, 1).setPipeline('Light2D').setDepth(0);
        this.MakeBehaviour(this.testCharacter);
        this.testCharacter.AddBehaviour("playerInput", new PlayerInput());
        this.testCharacter.AddBehaviour("playerAnimator", new PlayerAnimator());

        // create collision between player and platform
        this.physics.add.collider(this.testCharacter, platform);

        // create lights & assign mouse movement events
        this.spotlight = this.lights.addLight(128, 128, 200, 0xFF8800, 2);

        this.input.on('pointermove', function (pointer) {
            this.context.spotlight.x = pointer.x;
            this.context.spotlight.y = pointer.y;
        }).context = this;

        this.lights.enable()//.setAmbientColor(0x888888);

        // create a playfab player id feedback message
        this.add.text(10, 10, `Playfab ID: ${PlayFab._internalSettings.authenticationContext.PlayFabId}`, {fontFamily: 'Monogram', fontSize: 24});
    }
}