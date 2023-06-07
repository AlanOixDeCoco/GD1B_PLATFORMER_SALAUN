import BossController from "../Enemies/Boss/BossController.js";
import BossAura from "../Enemies/BossAura.js";
import EnemyManager from "../Enemies/EnemyManager.js";
import FloorManager from "./FloorManager.js";

export default class BossFloorManager extends FloorManager {
    start(){
        super.start();

        this._scene.time.delayedCall(1000, this.StartBoss, null, this);
    }
    
    SetGameManager(gameManager){
        this._gameManager = gameManager;
        this._gameManager.SetFloorManager(this);
    }

    StartBoss(){
        this.SpawnBoss(320, 192);
        this.WaitForEnemiesKilled();
    }

    WaitForEnemiesKilled(){
        var enemiesAlive = this._scene._groundEnemiesGroup.children.entries.length + this._scene._flyingEnemiesGroup.children.entries.length;

        if((enemiesAlive) == 0){
            console.log("Wave clear");
            this._exitDoor.Unlock();
        }
        else {
            this._scene.time.delayedCall(1000, this.WaitForEnemiesKilled, null, this);
        }
    }

    SpawnBoss(x, y){
        var bossSprite = this._scene.physics.add.sprite(x, this.GetRandomHeight(), "");
        bossSprite.setOrigin(.5, 1)
        .setPipeline('Light2D')
        .setDepth(LAYERS.enemies);
        bossSprite.body.allowGravity = false;
        this._scene.MakeBehaviors(bossSprite, {
            "enemyManager": new EnemyManager(this._gameManager),
            "enemyAura": new BossAura(),
        });
        var enemyManager = bossSprite.GetBehaviour("enemyManager");
        enemyManager.SetStats(ENEMIES_STATS["boss"]);
        enemyManager.SetTarget(this._scene._playerManager._parent);
        enemyManager.SetSpawnY(this._spawnY.min, this._spawnY.max);
        this._scene._enemiesGroup.add(bossSprite);
        
        
        bossSprite.y = y;
        bossSprite.setTint(ENEMIES_TINT.green);
        bossSprite.scaleX = 3;
        bossSprite.scaleY = 3;
        bossSprite.body.setSize(28, 10);
        bossSprite.body.setOffset(4, 11);

        bossSprite.AddBehaviour("bossController", new BossController(enemyManager));
        this._scene._flyingEnemiesGroup.add(bossSprite);
    }
}