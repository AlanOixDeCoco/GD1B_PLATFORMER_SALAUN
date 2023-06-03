import IState from "../../Components/State.js";

export class GreenBatSpawnState extends IState {
    constructor(greenBatController) {
        super("greenBat_spawn");
        this._greenBatController = greenBatController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Green bat spawns!");
        this._greenBatController._parent.anims.play("bat_spawn");
    }

    OnExitState(){
        this._greenBatController._enemyManager._ready = true;
    }
}

export class GreenBatMoveState extends IState {
    constructor(greenBatController) {
        super("greenBat_move");
        this._greenBatController = greenBatController;
    }

    Tick(){
        if(this._movingVertically) return;
        if(Math.abs(this._greenBatController._parent.body.velocity.x) < 0.1){
            if(this._greenBatController._parent.y < this._greenBatController._enemyManager._spawnY.max - 32){
                var moveDown = this._greenBatController._parent.scene.tweens.add({
                    targets: [this._greenBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: "+=32",
                    repeat: 0
                });
                moveDown.setCallback("onStart", () => {
                    if(!this._greenBatController._parent.body) return;
                    this._greenBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveDown.setCallback("onComplete", () => {
                    if(!this._greenBatController._parent.body) return;
                    this._greenBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                });
            }
            else {
                var moveUp = this._greenBatController._parent.scene.tweens.add({
                    targets: [this._greenBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: `+=${this._greenBatController._enemyManager._spawnY.min - this._greenBatController._enemyManager._spawnY.max}`,
                    repeat: 0
                });
                moveUp.setCallback("onStart", () => {
                    if(!this._greenBatController._parent.body) return;
                    this._greenBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveUp.setCallback("onComplete", () => {
                    if(!this._greenBatController._parent.body) return;
                    this._greenBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                });
            }
        }
    }

    OnEnterState(){
        console.log("Green bat moves!");
        this._greenBatController._parent.anims.play("bat_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * this._greenBatController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed;
        this._greenBatController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}