import Behaviour from "../Components/Behaviour.js";
import EnemyAura from "./EnemyAura.js";

export default class EnemyManager extends Behaviour {
    constructor(gameManager){
        super();
        this._gameManager = gameManager;
        this._stats = {
            damage: 1,
            speed: 1,
            initialHealth: 1,
            health: 1,
            smart: 1
        };
        this._ready = false;
    }

    start(){
        this._scene = this._parent.scene;

        this._attackUI = this._scene.add.sprite(this._parent.x, this._parent.y - this._parent.height, "interact_ui_atlas", "exclamation.png");
        this._attackUI.setTint(0xFF2222);
        this._attackUI.setDepth(LAYERS.enemies + 1).setOrigin(.5, 1);
        this._attackUI.setVisible(false);

        // start update method
        super.start();
    }

    update(){
        this._attackUI.x = this._parent.x;
        this._attackUI.y = this._parent.y - this._parent.height;

        this._parent.setFlipX(this._parent.body.velocity.x < 0);
    }

    SetStats(stats){
        this._stats.damage = stats.damage;
        this._stats.initialHealth = stats.health;
        this._stats.health = stats.health;
        this._stats.speed = stats.speed;
        this._stats.smart = stats.smart;
    }

    SetTarget(playerSprite){
        this._target = playerSprite;
    }

    SetSpawnY(yMin, yMax){
        this._spawnY = {min: yMin, max: yMax};
    }

    TakeDamage(amount){
        this._stats.health -= amount;
        if(this._stats.health <= 0){
            this._parent.destroy();
        } 
    }

    destroy(){
        this._attackUI.destroy();

        // Create new soul pickup
        var soulSprite = this._scene.physics.add.sprite(this._parent.x, this._parent.y - 16, SPRITE_KEYS.enemySoul);
        soulSprite.setDepth(LAYERS.enemies)
        .setOrigin(.5, .5)
        .setPipeline("Light2D");

        soulSprite.setVelocity(0, -300);
        soulSprite.setBounce(0.5);
        soulSprite.body.setDrag(125);
        soulSprite.body.setCircle(10, -5, -5);

        this._scene.MakeBehaviors(soulSprite, {
            "enemyAura": new EnemyAura(),
        });

        soulSprite._exp = this._stats.damage + this._stats.initialHealth + this._stats.speed + this._stats.smart;
        
        this._scene._soulsGroup.add(soulSprite);

        super.destroy();
    }
}