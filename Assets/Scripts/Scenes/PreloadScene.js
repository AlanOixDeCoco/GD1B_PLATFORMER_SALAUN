import BehaviourScene from "../Components/BehaviourScene.js";

export default class PreloadScene extends BehaviourScene{
    constructor() {
        super(SCENE_PRELOAD);
    }

    preload(){
        // Create a label to keep track of the loading
        this._loadingText = this.add.text(
            GAME_WIDTH/2, GAME_HEIGHT/2, 
            `Chargement : ${0}%`, 
            {fontFamily: 'Monogram', fontSize: 24},
        ).setOrigin(.5, .5).setTint(0xFFFFFF).setDepth(LAYERS.walls);

        // image used as transition mask
        this.load.image("circle_mask", "Assets/Sprites/Masks/circle_mask.png", {frameWidth: 2048});

        //#region placeholder content
        // Background
        this.load.image(SPRITE_KEYS.background, './Assets/Sprites/Environment/Prototype/prototype_background.png')
        //#endregion

        //#region image files
        // Tileset
        this.load.image({
            key: TILESET_00,
            url: './Assets/Maps/tileset.png',
            normalMap: './Assets/Maps/tileset_n.png'
        });

        // Environment
        this.load.atlas({
            key: 'environment_atlas',
            textureURL: './Assets/Sprites/Environment/environment_atlas.png',
            normalMap: './Assets/Sprites/Environment/environment_atlas_n.png',
            atlasURL: './Assets/Sprites/Environment/environment_atlas.json'
        });
        this.load.atlas({
            key: 'environment_ui_atlas',
            textureURL: './Assets/Sprites/UI/Environment/environment_ui_atlas.png',
            atlasURL: './Assets/Sprites/UI/Environment/environment_ui_atlas.json'
        });

        // Characters
        this.load.atlas({
            key: 'character_atlas',
            textureURL: './Assets/Sprites/Characters/Player/character_atlas.png',
            normalMap: './Assets/Sprites/Characters/Player/character_atlas_n.png',
            atlasURL: './Assets/Sprites/Characters/Player/character_atlas.json'
        });
        this.load.atlas({
            key: 'sword_areas_atlas',
            textureURL: './Assets/Sprites/Characters/Player/sword_areas_atlas.png',
            atlasURL: './Assets/Sprites/Characters/Player/sword_areas_atlas.json'
        });

        this.load.atlas({
            key: 'enemies_atlas',
            textureURL: './Assets/Sprites/Characters/Enemies/enemies_atlas.png',
            //normalMap: './Assets/Sprites/Characters/Enemies/enemies_atlas_n.png',
            atlasURL: './Assets/Sprites/Characters/Enemies/enemies_atlas.json'
        });
        
        this.load.image(SPRITE_KEYS.playerSoul, './Assets/Sprites/Characters/Player/playerSoul.png');
        this.load.image(SPRITE_KEYS.enemySoul, './Assets/Sprites/Characters/Enemies/enemySoul.png');
        //#endregion

        //#region tilemaps
        this.load.tilemapTiledJSON(MAP_DUNGEON_ENTRANCE, './Assets/Maps/JSON/map_entrance.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_BOSS, './Assets/Maps/JSON/map_boss.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[0], './Assets/Maps/JSON/map_floor_00.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[1], './Assets/Maps/JSON/map_floor_01.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[2], './Assets/Maps/JSON/map_floor_02.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[3], './Assets/Maps/JSON/map_floor_03.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[4], './Assets/Maps/JSON/map_floor_04.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[5], './Assets/Maps/JSON/map_floor_05.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[6], './Assets/Maps/JSON/map_floor_06.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[7], './Assets/Maps/JSON/map_floor_07.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[8], './Assets/Maps/JSON/map_floor_08.tmj');
        this.load.tilemapTiledJSON(MAP_DUNGEON_FLOORS[9], './Assets/Maps/JSON/map_floor_09.tmj');
        //#endregion

        //#region audio files
        // Ambiance
        this.load.audio(AUDIO_KEYS.ambianceOwl, './Assets/Audio/Ambiance/audio_ambiance_owl.ogg');

        // Player
        this.load.audio(AUDIO_KEYS.playerJump, './Assets/Audio/Player/audio_player_jump.wav');
        this.load.audio(AUDIO_KEYS.playerDash, './Assets/Audio/Player/audio_player_dash.wav');

        // Door
        this.load.audio(AUDIO_KEYS.doorUnlock, './Assets/Audio/Door/audio_door_unlock.wav');
        this.load.audio(AUDIO_KEYS.doorOpen, './Assets/Audio/Door/audio_door_open.wav');

        // Torch
        this.load.audio(AUDIO_KEYS.torch, './Assets/Audio/Torch/audio_torch_fire.wav');
        //#endregion

        //#region Bitmap fonts
        this.load.bitmapFont('CursedScript', 'Assets/Fonts/CursedScript.png', 'Assets/Fonts/CursedScript.fnt');
        //#endregion

        //#region loading states
        this.load.on('progress', (value) => {
            console.log(value);
            this._loadingText.setText(`Chargement : ${Math.round(value * 100)}%`);
        });
                    
        this.load.on('fileprogress', (file) => {
            console.log(file.key);
        });
        this.load.on('complete', () => {
            console.log('complete');
            this.StartBackgroundScene();
        });
        //#endregion
    }

    StartBackgroundScene(){
        this.scene.start(SCENE_BACKGROUND);
    }
}
//#endregion