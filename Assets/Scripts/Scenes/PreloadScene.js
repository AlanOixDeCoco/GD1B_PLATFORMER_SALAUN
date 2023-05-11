import BehaviourScene from "../components/BehaviourScene.js";

export default class PreloadScene extends BehaviourScene{
    constructor() {
        super(SCENE_PRELOAD);
    }

    preload(){
        //#region placeholder content
        this.load.image({
            key: 'prototype_background_10x5',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_10x5.png',
        });
        this.load.image({
            key: 'prototype_background_14x9',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_14x9.png',
        });
        this.load.image({
            key: 'prototype_background_16x5',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_16x5.png',
        });
        this.load.image({
            key: 'prototype_background_16x9',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_16x9.png',
        });
        this.load.image({
            key: 'prototype_background_18x13',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_18x13.png',
        });
        this.load.image({
            key: 'prototype_background_full',
            url: './Assets/Sprites/Environment/Prototype/prototype_background_full.png',
        });
        
        this.load.spritesheet({
            key: "character_placeholder_spritesheet",
            url: './Assets/Sprites/characters/player/character_placeholder_spritesheet.png',
            frameConfig: {frameWidth: 32}
        });
        //#endregion

        //#region image files
        //this.load.atlas({
        //    key: 'character_atlas',
        //    textureURL: './Assets/Sprites/characters/player/character_atlas.png',
        //    normalMap: './Assets/Sprites/characters/player/character_atlas_n.png',
        //    atlasURL: './Assets/Sprites/characters/player/character_atlas.json'
        //});

        this.load.image("circle_mask", "Assets/Sprites/masks/circle_mask.png", {frameWidth: 2048});
        //#endregion

        //#region audio files
        // ...
        //#endregion

        //#region loading states
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
        //#endregion
    }
}
//#endregion