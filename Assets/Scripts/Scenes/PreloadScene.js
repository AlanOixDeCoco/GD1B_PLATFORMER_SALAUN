import BehaviourScene from "../BehaviourScene.js";

export default class PreloadScene extends BehaviourScene{
    constructor() {
        super(SCENE_PRELOAD);
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
            //normalMap: './assets/sprites/test_platform.png'
        });

        this.load.spritesheet({
            key: "character_placeholder_spritesheet",
            url: './assets/sprites/characters/player/character_placeholder_spritesheet.png',
            frameConfig: {frameWidth: 32}
        });

        this.load.atlas({
            key: 'character_atlas',
            textureURL: './assets/sprites/characters/player/character_atlas.png',
            normalMap: './assets/sprites/characters/player/character_atlas_n.png',
            atlasURL: './assets/sprites/characters/player/character_atlas.json'
        });

        this.load.on('progress', (value) => {
            console.log(value);
        });
                    
        this.load.on('fileprogress', (file) => {
            console.log(file.key);
        });
        this.load.on('complete', () => {
            console.log('complete');
            this.scene.start(SCENE_BACKGROUND);
        });
    }
}
//#endregion