// Debug mode
const DEBUG = false;

//#region Game constants
const GAME_TITLE = "Night Knight";
const GAME_VERSION = "24.04.23_04.29";
const GAME_WIDTH = 640;
const GAME_HEIGHT = 480;
//#endregion

//#region PlayFab constants
const PLAYFAB_TITLE_ID = "20AC9";
//#endregion

//#region Physics constants
const PHYSICS_GRAVITY_Y = 50 * 32;
//#endregion

//#region Scenes keys constants
const SCENE_PRELOAD = "scene_preload";
const SCENE_BACKGROUND = "scene_background";
const SCENE_LOGIN = "scene_login";
const SCENE_MAIN_MENU = "scene_main_menu";
const SCENE_DUNGEON_ENTRANCE = "scene_dungeon_entrance";
const SCENE_DUNGEON_TRANSITION = "scene_dungeon_transition";
const SCENE_DUNGEON_FLOOR = "scene_dungeon_floor";
const SCENE_DUNGEON_BOSS_TRANSITION = "scene_dungeon_boss_transition";
const SCENE_DUNGEON_BOSS = "scene_dungeon_boss";
const SCENE_GAMEOVER = "scene_gameover";
//#endregion

//#region Game DEFAULT stats constants
const GAME_DEFAULT_TIME = 300000; // in milliseconds --> 5min
//#endregion

//#region Player DEFAULT stats constants
const PLAYER_HEIGHT = 48;
const PLAYER_DEFAULT_SPEED = 150;
const PLAYER_GHOST_JUMP_DURATION = 100;
const PLAYER_DEFAULT_JUMP_VELOCITY = 450;
const PLAYER_DEFAULT_HEALTH = 5;
const PLAYER_DEFAULT_INVINCIBLE_DURATION = 1000;
const PLAYER_DEFAULT_DASH_VELOCITY = 400;
const PLAYER_DEFAULT_DASH_DURATION = 200;
const PLAYER_DEFAULT_DASH_RECOVER_TIME = 1000;
const PLAYER_DEFAULT_ATTACK_DAMAGE = 1;
const PLAYER_DEFAULT_ATTACK_SPEED = 196;
const PLAYER_DEFAULT_ATTACK_LIFETIME = 100;

const PLAYER_DEFAULT_LEVEL_EXPERIENCE = 10;
const PLAYER_DEFAULT_LEVEL_EXPERIENCE_MULTIPLICATOR = 1.5;
//#endregion

//#region Maps keys
const MAP_DUNGEON_ENTRANCE = "map_dungeon_entrance";
const MAP_DUNGEON_BOSS = "map_dungeon_boss";
const MAP_DUNGEON_FLOORS = [
    "map_dungeon_floor_00",
    "map_dungeon_floor_01",
    "map_dungeon_floor_02",
    "map_dungeon_floor_03",
    "map_dungeon_floor_04",
    "map_dungeon_floor_05",
    "map_dungeon_floor_06",
    "map_dungeon_floor_07",
    "map_dungeon_floor_08",
    "map_dungeon_floor_09",
];
const MAP_DUNGEON_DEATH = "map_dungeon_death";
//#endregion

//#region Floor types
const FLOOR_TYPES = {
    safe: "safe",
    dungeon: "dungeon",
    boss: "boss"
};
//#endregion

const SPAWN_INTERVAL = 2000;

const ENEMIES_BASE_STATS = {
    damage: 1,
    speed: 64,
    health: 1,
    smart: 1,
    redEnemiesDetectionRadius: 128,
    purpleEnemiesDetectionRadius: 4,
}
const ENEMIES_STATS = {
    "greenSnake": { damage: 1, speed: 1, health: 1, smart: 0},  // total : 3
    "redSnake": { damage: 1, speed: 1, health: 1, smart: 2},    // total : 5
    "greenBat": { damage: 1, speed: 1, health: 1, smart: 1},    // total : 4
    "purpleBat": { damage: 1, speed: 1, health: 1, smart: 2},   // total : 5
    "redBat": { damage: 1, speed: 1, health: 1, smart: 4},      // total : 7
}

const MAP_WAVES = [
    [
        {total: 10, enemies: ["greenSnake"]},
    ],
    [
        {total: 10, enemies: ["greenSnake"]},
        {total: 15, enemies: ["greenSnake", "redSnake"]},
    ],
    [
        {total: 15, enemies: ["greenSnake", "redSnake"]},
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "greenBat"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "greenBat"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "greenBat"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "greenBat"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "purpleBat"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "purpleBat"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "purpleBat"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "purpleBat"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "purpleRed"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "purpleRed"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "purpleRed"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "purpleRed"]},
    ],
    [
        {total: 20, enemies: ["greenSnake", "redSnake"]},
        {total: 25, enemies: ["greenSnake", "redSnake", "purpleRed"]},
        {total: 30, enemies: ["greenSnake", "redSnake", "purpleRed"]},
    ],
];

const ENEMIES_TINT = {
    green: 0x00AA00,
    red: 0xAA0000,
    purple: 0x220088,
}

//#region Sprites keys
const SPRITE_KEYS = {
    background: "sprite_background",
    door: {
        locked: "door_00.png",
        unlocked: "door_01.png",
        opened: "door_02.png"
    },
    sign: "sign.png",
    torch: "torch.png",
    platform: [
        "platform_00.png",
        "platform_01.png",
        "platform_02.png",
        "platform_03.png"
    ],
    rope: "platform_support.png",

    enemies: {
        greenSnake: "green_snake",
        redSnake: "red_snake",
        greenBat: "green_bat",
        purpleBat: "purple_bat",
        redBat: "red_bat",
        boss: "boss",
    },
    enemySoul: "enemy_soul",
    playerSoul: "player_soul",

    uiBanner: {
        "safe": "banner_00.png",
        "dungeon": "banner_01.png",
        "boss": "banner_02.png"
    },

    uiCylinder: "timer_",
    uiCylinderShell: "timer_shell.png"
}
//#endregion

//#region Animations keys
const ANIMATIONS_KEYS = {
    // Door
    doorUnlock: "door_unlock",
    doorOpen: "door_open",
    doorUnlocked: "door_unlocked",
    torchFire: "torch_fire",
}
//#endregion

//#region Audio keys
const AUDIO_KEYS = {
    ambianceOwl: "ambiance_owl",

    playerJump: "player_jump",
    playerDash: "player_dash",

    doorUnlock: "door_unlock",
    doorOpen: "door_open",

    torch: "torch",
}
//#endregion

//#region Tilesets
const TILESET_00 = "tileset_00";
//#endregion

//#region Layers
const LAYERS = {
    background: 0,
    walls: 20,
    interactObjects: 30,
    platforms: 40,
    enemies: 50,
    player: 60,
    ground: 100,
    environmentUI: 150,
    overlayUI: 200
}
//#endregion

//#region Sound volume
const VOLUME = {
    ambianceOwl: 1,
    door: 1.5,
    torch: 0.1,
}
//#endregion

//#region Effects tweaking
const EFFECTS = {
    ambianceColor: 0x220088,

    auraColor: 0x6666FF,
    auraRange: 80,
    auraIntensity: 3,

    enemyAuraColor: 0xFF2222,
    enemyAuraRange: 64,
    enemyAuraIntensity: 3,
    
    torchColor: 0xFF8800,
    torchRange: 56,
    torchIntensity: 2.5,
    torchVariationRange: 0.2,
    torchVariationInterval: 100,
}
//#endregion

//#region Gamepad buttons
const BUTTON_ATTACK = 1;
const BUTTON_JUMP = 0;
const BUTTON_DASH = 3;
const BUTTON_INTERACT = 2;
const BUTTON_LEFT = 14;
const BUTTON_RIGHT = 15;
const BUTTON_DOWN = 13;
//#endregion