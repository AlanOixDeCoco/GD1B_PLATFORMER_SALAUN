import BehaviourScene from "../components/BehaviourScene.js";

export default class PreloadScene extends BehaviourScene{
    constructor() {
        super(SCENE_PRELOAD);
    }

    preload(){
        //#region placeholder content
        this.load.image({
            key: 'prototype_background',
            url: './Assets/Sprites/Environment/prototype_background.png',
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