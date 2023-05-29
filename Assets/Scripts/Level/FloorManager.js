import EnemyAura from "../Enemies/EnemyAura.js";
import EnemyManager from "../Enemies/EnemyManager.js";
import GreenSnakeManager from "../Enemies/Managers/GreenSnakeManager.js";
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

        this.StartFloor();
    }

    StartFloor(){
        this._enemiesCheckInterval = setInterval(() => {
            var enemiesAlive = this._scene._enemiesGroup.children.entries.length;
            var remainingEnemies = this._waveEnemies.length;

            if((enemiesAlive + remainingEnemies) == 0){
                console.log("Wave clear");
                if(this._wave >= this._floorWaves){
                    if(this._exitDoor._locked) this._exitDoor.Unlock();
                }
                else {
                    this.StartWave();
                }
            }
        }, 1000);
    }

    SetExitDoor(doorManager){
        this._exitDoor = doorManager;
    }

    SetSpawnArea(spawnArea){
        this._spawnY.min = spawnArea.y + 32;
        this._spawnY.max = spawnArea.y + spawnArea.height + 32;
    }

    StartWave(){
        this._waveEnemies = this.GenerateWaveEnemies(MAP_WAVES[this._gameManager._data.floor][this._wave]);
        this._wave++;
        this.startSpawnerTimeout = setTimeout(() => {
            this.StartSpawner();
        }, 2000);
    }

    StartSpawner(){
        this._spawnerInterval = setInterval(() => {
            if(this._waveEnemies.length <= 0) {
                clearInterval(this._spawnerInterval);
                return;
            }
            var nextEnemyX = this._gameManager._currentScene._playerManager._parent.x;
            this._nextEnemySpawnTimeout = setTimeout(() => {
                this.SpawnEnemy(this._waveEnemies.shift(), nextEnemyX);
            }, 1000);
        }, SPAWN_INTERVAL);
    }

    SpawnEnemy(type, x){
        var enemyManager = null;
        switch(type){
            case "greenSnake":
                console.log("Green snake");
                enemyManager = new GreenSnakeManager(this._gameManager);
                break;
            case "redSnake":
                console.log("Green snake");
                enemyManager = new GreenSnakeManager(this._gameManager);
                break;
            case "greenBat":
                console.log("Green snake");
                break;
            case "purpleBat":
                console.log("Green snake");
                break;
            case "redBat":
                console.log("Green snake");
                break;
            case "boss":
                console.log("Green snake");
                break;
            default:
                console.log("Unknown enemy type!");
                return;
        }
        var enemySprite = this._scene.physics.add.sprite(x, this.GetRandomHeight(), "");
        enemySprite.setOrigin(.5, 1)
        .setPipeline('Light2D')
        .setDepth(LAYERS.enemies);
        this._scene.MakeBehaviors(enemySprite, {
            "enemyManager": enemyManager,
            "enemyAura": new EnemyAura(),
        });
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

    destroy(){
        clearInterval(this._spawnerInterval);
        clearTimeout(this._nextEnemySpawnTimeout);
        clearInterval(this._enemiesCheckInterval);
        clearTimeout(this.startSpawnerTimeout);
        delete this;
    }
}