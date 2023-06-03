import GreenBatController from "../Enemies/Bats/GreenBatController.js";
import PurpleBatController from "../Enemies/Bats/PurpleBatController.js";
import RedBatController from "../Enemies/Bats/RedBatController.js";
import EnemyAura from "../Enemies/EnemyAura.js";
import EnemyManager from "../Enemies/EnemyManager.js";
import GreenSnakeController from "../Enemies/Snakes/GreenSnakeController.js";
import RedSnakeController from "../Enemies/Snakes/RedSnakeController.js";
import Behaviour from "../components/Behaviour.js";

export default class FloorManager extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        this._spawnY = {
            min: 0,
            max: 0
        }

        // Create enemies anims
        this._scene.anims.create({
            key: 'snake_spawn',
            frames: this._scene.anims.generateFrameNames("enemies_atlas", {
                prefix: 'snake_spawn_',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 2
            }),
            frameRate: 1,
            repeat: 0,
        });

        this._scene.anims.create({
            key: 'snake_move',
            frames: this._scene.anims.generateFrameNames("enemies_atlas", {
                prefix: 'snake_move_',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 2
            }),
            frameRate: 1,
            repeat: 0,
        });

        this._scene.anims.create({
            key: 'bat_spawn',
            frames: this._scene.anims.generateFrameNames("enemies_atlas", {
                prefix: 'bat_spawn_',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 2
            }),
            frameRate: 1,
            repeat: 0,
        });

        this._scene.anims.create({
            key: 'bat_move',
            frames: this._scene.anims.generateFrameNames("enemies_atlas", {
                prefix: 'bat_move_',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 2
            }),
            frameRate: 1,
            repeat: 0,
        });

        super.start();
    }

    SetGameManager(gameManager){
        this._gameManager = gameManager;
        this._gameManager.SetFloorManager(this);
        
        this._floor = this._gameManager._data.floorCount - 1;
        this._floorWaves = MAP_WAVES[this._floor].length;

        this._wave = 0;
        this._waveEnemies = [];

        this.StartWave();
    }

    SetExitDoor(doorManager){
        this._exitDoor = doorManager;
    }

    SetSpawnArea(spawnArea){
        this._spawnY.min = spawnArea.y + 64;
        this._spawnY.max = spawnArea.y + spawnArea.height + 32;
    }

    StartWave(){
        // Procedural enemies preparation
        this._waveEnemies = this.GenerateWaveEnemies(MAP_WAVES[this._floor][this._wave]);
        
        // Start the spawner after a delay
        this._scene.time.delayedCall(1000, this.TickSpawner, null, this);
        
        this._wave++;
    }

    TickSpawner(){
        this._scene.time.delayedCall(SPAWN_INTERVAL, () => {
            var nextEnemyX = this._gameManager._currentScene._playerManager._parent.x;
            this.SpawnEnemy(this._waveEnemies[this._waveEnemies.length - 1], nextEnemyX);
            this._waveEnemies.pop();
            
            if(this._waveEnemies.length > 0){
                this.TickSpawner();
            }
            else {
                this.WaitForEnemiesKilled();
            }
        }, null, this);
    }

    WaitForEnemiesKilled(){
        var enemiesAlive = this._scene._groundEnemiesGroup.children.entries.length + this._scene._flyingEnemiesGroup.children.entries.length;
        var remainingEnemies = this._waveEnemies.length;

        if((enemiesAlive + remainingEnemies) == 0){
            console.log("Wave clear");
            if(this._wave == this._floorWaves){
                if(this._exitDoor._locked) this._exitDoor.Unlock();
            }
            else {
                this.StartWave();
            }
        }
        else {
            this._scene.time.delayedCall(1000, this.WaitForEnemiesKilled, null, this);
        }
    }

    SpawnEnemy(type, x){
        var enemySprite = this._scene.physics.add.sprite(x, this.GetRandomHeight(), "");
        enemySprite.setOrigin(.5, 1)
        .setPipeline('Light2D')
        .setDepth(LAYERS.enemies);
        enemySprite.body.allowGravity = false;
        this._scene.MakeBehaviors(enemySprite, {
            "enemyManager": new EnemyManager(this._gameManager),
            "enemyAura": new EnemyAura(),
        });
        var enemyManager = enemySprite.GetBehaviour("enemyManager");
        enemyManager.SetTarget(this._scene._playerManager._parent);
        enemyManager.SetSpawnY(this._spawnY.min, this._spawnY.max);
        this._scene._enemiesGroup.add(enemySprite);
        switch(type){
            case "greenSnake":
                console.log("Green snake");
                enemySprite.setTint(ENEMIES_TINT.green);
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                this._scene._groundEnemiesGroup.add(enemySprite);
                break;
            case "redSnake":
                console.log("Red snake");
                enemySprite.setTint(ENEMIES_TINT.red);
                enemySprite.AddBehaviour("redSnakeController", new RedSnakeController(enemyManager));
                this._scene._groundEnemiesGroup.add(enemySprite);
                break;
            case "greenBat":
                console.log("Green bat");
                enemySprite.setTint(ENEMIES_TINT.green);
                enemySprite.AddBehaviour("greenBatController", new GreenBatController(enemyManager));
                this._scene._flyingEnemiesGroup.add(enemySprite);
                break;
            case "purpleBat":
                console.log("Purple bat");
                enemySprite.setTint(ENEMIES_TINT.purple);
                enemySprite.AddBehaviour("purpleBatController", new PurpleBatController(enemyManager));
                this._scene._flyingEnemiesGroup.add(enemySprite);
                break;
            case "redBat":
                console.log("Red bat");
                enemySprite.setTint(ENEMIES_TINT.red);
                enemySprite.AddBehaviour("redBatController", new RedBatController(enemyManager));
                this._scene._flyingEnemiesGroup.add(enemySprite);
                break;
            case "boss":
                console.log("Boss");
                enemySprite.setTint(ENEMIES_TINT.purple);
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                this._scene._flyingEnemiesGroup.add(enemySprite);
                break;
            default:
                console.log("Unknown enemy type!");
                return;
        }
    }

    GenerateWaveEnemies(wave){
        var total = 0;
        var enemies = [];
        while(total < wave.total){
            var randomIndex = Math.round(Math.random() * (wave.enemies.length - 1));
            enemies.push(wave.enemies[randomIndex]);
            
            var enemyStats = ENEMIES_STATS[wave.enemies[randomIndex]];
            var enemyPoints = enemyStats.damage + enemyStats.speed + enemyStats.health + enemyStats.smart;
            total += enemyPoints;
        }

        return enemies;
    }

    GetRandomHeight(){
        // Get a random height between min and max y
        var randomHeight = this._spawnY.min;
        randomHeight += Math.floor(Math.random() * (this._spawnY.max - this._spawnY.min));

        // Then remove the modulo of a /32 division to get an entire-tile based spawn
        randomHeight -= randomHeight % 32;
        
        return randomHeight;
    }
}