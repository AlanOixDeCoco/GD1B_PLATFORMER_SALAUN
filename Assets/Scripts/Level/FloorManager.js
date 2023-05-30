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
        super.start();
    }

    SetGameManager(gameManager){
        this._gameManager = gameManager;
        this._gameManager.SetFloorManager(this);
        
        this._floor = this._gameManager._data.floor;
        this._floorWaves = MAP_WAVES[this._gameManager._data.floor].length;

        this._wave = 0;
        this._waveEnemies = [];

        this.StartWave();
    }

    SetExitDoor(doorManager){
        this._exitDoor = doorManager;
    }

    SetSpawnArea(spawnArea){
        this._spawnY.min = spawnArea.y + 32;
        this._spawnY.max = spawnArea.y + spawnArea.height + 32;
    }

    StartWave(){
        // Procedural enemies preparation
        this._waveEnemies = this.GenerateWaveEnemies(MAP_WAVES[this._gameManager._data.floor][this._wave]);
        
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
        var enemiesAlive = this._scene._enemiesGroup.children.entries.length;
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
        var enemySprite = this._scene.physics.add.sprite(x, this.GetRandomHeight(), SPRITE_KEYS.sign);
        enemySprite.setOrigin(.5, 1)
        .setPipeline('Light2D')
        .setDepth(LAYERS.enemies);
        this._scene.MakeBehaviors(enemySprite, {
            "enemyManager": new EnemyManager(this._gameManager),
            "enemyAura": new EnemyAura(),
        });
        var enemyManager = enemySprite.GetBehaviour("enemyManager");
        switch(type){
            case "greenSnake":
                console.log("Green snake");
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                break;
            case "redSnake":
                console.log("Red snake");
                enemySprite.AddBehaviour("greenSnakeController", new RedSnakeController(enemyManager));
                break;
            case "greenBat":
                console.log("Green bat");
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                break;
            case "purpleBat":
                console.log("Purple bat");
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                break;
            case "redBat":
                console.log("Red bat");
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                break;
            case "boss":
                console.log("Boss");
                enemySprite.AddBehaviour("greenSnakeController", new GreenSnakeController(enemyManager));
                break;
            default:
                console.log("Unknown enemy type!");
                return;
        }
        this._scene._enemiesGroup.add(enemySprite);
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