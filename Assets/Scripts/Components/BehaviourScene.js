import Torch from "../Decorations/Torch.js";
import DoorController from "../InteractObjects/Door/DoorController.js";
import FloorUIController from "../Level/FloorUIController.js";
import PlayerAnimator from "../Player/PlayerAnimator.js";
import PlayerAura from "../Player/PlayerAura.js";
import PlayerBody from "../Player/PlayerBody.js";
import PlayerManager from "../Player/PlayerManager.js";
import PlayerUIController from "../Player/PlayerUIController.js";

export default class BehaviourScene extends Phaser.Scene {
    constructor(key, active = true, visible = true) {
        super({key: key, active: active, visible: visible});
        this._behaviourObjects = [];
    }

    update(time, deltatime){
        this._behaviourObjects.forEach(behaviourObject => {
            behaviourObject.update(time, deltatime);
        });
    }

    MakeBehaviour(gameobject){
        // Gameobject modification
        gameobject._behaviours = {};
        gameobject.update = (time, deltatime) => {
            for(let identifier in gameobject._behaviours){
                gameobject._behaviours[identifier].update(time, deltatime);
            }
        };
        gameobject.AddBehaviour = (identifier = "unamed behaviour", behaviour) => {
            behaviour.init(identifier, gameobject);
        };
        gameobject.GetBehaviour = (identifier) => {
            return gameobject._behaviours[identifier];
        };
        gameobject.on('destroy', () => {
            for(let identifier in gameobject._behaviours){
                gameobject._behaviours[identifier].destroy();
                delete gameobject._behaviours[identifier];
            }
        })

        // Add the modified gameobject to the scene update loop
        this._behaviourObjects.push(gameobject);
    }

    MakeBehaviors(gameobject, behaviors){
        this.MakeBehaviour(gameobject);
        for(let identifier in behaviors){
            gameobject.AddBehaviour(identifier, behaviors[identifier]);
        }
    }

    CreateDoor(x, y, unlocked){
        var doorSprite = this.physics.add.sprite(x, y, "environment_atlas", SPRITE_KEYS.door.locked)
        .setDepth(LAYERS.interactObjects)
        .setOrigin(0, 0)
        .setPipeline('Light2D');
        this.MakeBehaviors(doorSprite, {
            "door_controller": new DoorController(),
        });
        if(unlocked) {
            doorSprite.GetBehaviour("door_controller").SetUnlocked();
        }
        doorSprite.body.allowGravity = false;
        doorSprite.body.immovable = true;

        return doorSprite.GetBehaviour("door_controller");
    }

    CreateDecorativeDoor(x, y){
        var doorSprite = this.add.sprite(x, y, "environment_atlas", SPRITE_KEYS.door.opened)
        .setDepth(LAYERS.interactObjects)
        .setOrigin(0, 0)
        .setPipeline('Light2D');

        return doorSprite;
    }

    CreateSign(x, y, text){
        var signSprite = this.physics.add.sprite(x, y, "environment_atlas", SPRITE_KEYS.sign)
        .setDepth(LAYERS.interactObjects)
        .setOrigin(0, 0)
        .setPipeline('Light2D');
        //this.MakeBehaviors(signSprite, {
        //    "sign_controller": new (),
        //});

        signSprite.body.allowGravity = false;
        signSprite.body.immovable = true;
    }

    CreateTorch(x, y, intensity){
        var torchSprite = this.add.sprite(x, y, "environment_atlas", SPRITE_KEYS.torch)
        .setDepth(LAYERS.interactObjects)
        .setPipeline('Light2D')
        .setOrigin(0.5, 0);
        this.MakeBehaviors(torchSprite, {
            "torch_controller": new Torch(),
        });
        torchSprite.GetBehaviour("torch_controller").SetIntensity(EFFECTS.torchIntensity);
    }

    CreatePlatform(x, y, width = 2){
        width -= 1;
        var platformSprite = this.physics.add.sprite(x, y, 'environment_atlas', SPRITE_KEYS.platform[width])
        .setOrigin(0, 0)
        .setPipeline('Light2D')
        .setDepth(LAYERS.platforms);

        platformSprite.body.allowGravity = false;
        platformSprite.body.immovable = true;

        var leftRope = this.add.sprite(x + 3, y, 'environment_atlas', SPRITE_KEYS.rope)
        .setDepth(LAYERS.platforms)
        .setPipeline('Light2D')
        .setOrigin(0, 1);
        
        var rightRope = this.add.sprite(x + ((width) * 32) + 26, y, 'environment_atlas', SPRITE_KEYS.rope)
        .setDepth(LAYERS.platforms)
        .setPipeline('Light2D')
        .setOrigin(0, 1);

        return platformSprite;
    }


    CreateUI(x, y, floorType, gameManager){
        var bannerSprite = this.add.sprite(x, y - 18, 'environment_ui_atlas', SPRITE_KEYS.uiBanner[floorType]);
        bannerSprite.setDepth(LAYERS.environmentUI).setOrigin(.5, 0);
        
        var bannerText = this.add.bitmapText(
            x + 1, 
            y - 9, 
            "CursedScript",
            gameManager._data.floorCount, 
            24
        );
        bannerText.setDepth(LAYERS.environmentUI + 1).setOrigin(.5, .5);

        var cylinderShellSprite = this.add.sprite(x - 40, y - 18, 'environment_ui_atlas', SPRITE_KEYS.uiCylinderShell);
        cylinderShellSprite.setDepth(LAYERS.environmentUI + 1).setOrigin(.5, 0);

        var cylinderSprite = this.add.sprite(x - 40, y - 15, 'environment_ui_atlas', `${SPRITE_KEYS.uiCylinder}00.png`);
        cylinderSprite.setDepth(LAYERS.environmentUI).setOrigin(.5, 0);

        this.MakeBehaviors(bannerSprite, {
            "floorUIController": new FloorUIController(gameManager, cylinderSprite)
        });
    }

    CreatePlayer(x, y, gameManager){
        var playerSprite = this.physics.add.sprite(x, y, 'character_placeholder_spritesheet')
        .setOrigin(0.5, 1)
        .setPipeline('Light2D')
        .setDepth(LAYERS.player);
        this.MakeBehaviors(playerSprite, {
            "player_animator": new PlayerAnimator(),
            "player_body": new PlayerBody(),
            "player_manager": new PlayerManager(gameManager),
            "player_UI_controller": new PlayerUIController(gameManager),
            "player_aura": new PlayerAura(),
        });
        return playerSprite;
    }
}