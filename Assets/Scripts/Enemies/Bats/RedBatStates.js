import IState from "../../components/State.js";

export class RedBatSpawnState extends IState {
    constructor(redBatController) {
        super("redBat_spawn");
        this._redBatController = redBatController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Red bat spawns!");
        this._redBatController._parent.anims.play("bat_spawn");
    }

    OnExitState(){
        this._redBatController._enemyManager._ready = true;
    }
}

export class RedBatMoveState extends IState {
    constructor(redBatController) {
        super("redBat_move");
        this._redBatController = redBatController;
    }

    Tick(){
        if(this._movingVertically) return;
        if(Math.abs(this._redBatController._parent.body.velocity.x) < 0.1){
            if(this._redBatController._parent.y < this._redBatController._enemyManager._spawnY.max - 32){
                this._redBatController._enemyManager._busy = true;
                const moveDown = this._redBatController._parent.scene.tweens.add({
                    targets: [this._redBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: "+=32",
                    repeat: 0
                });
                moveDown.setCallback("onStart", () => {
                    if(!this._redBatController._parent.body) return;
                    this._redBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveDown.setCallback("onComplete", () => {
                    if(!this._redBatController._parent.body) return;
                    this._redBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                    this._redBatController._enemyManager._busy = false;
                });
            }
            else {
                this._redBatController._enemyManager._busy = true;
                const moveUp = this._redBatController._parent.scene.tweens.add({
                    targets: [this._redBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: `+=${this._redBatController._enemyManager._spawnY.min - this._redBatController._enemyManager._spawnY.max}`,
                    repeat: 0
                });
                moveUp.setCallback("onStart", () => {
                    if(!this._redBatController._parent.body) return;
                    this._redBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveUp.setCallback("onComplete", () => {
                    if(!this._redBatController._parent.body) return;
                    this._redBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                    this._redBatController._enemyManager._busy = false;
                });
            }
        }
    }

    OnEnterState(){
        console.log("Red bat moves!");
        this._redBatController._enemyManager._attackUI.setVisible(false);

        if(this._velocity) {
            this._redBatController._parent.setVelocityX(this._velocity);
            return;
        }

        this._redBatController._parent.anims.play("bat_move");

        const randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (ENEMIES_STATS.redBat.speed * ENEMIES_BASE_STATS.speed);
        this._redBatController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}

export class RedBatAttackState extends IState {
    constructor(redBatController) {
        super("redBat_attack");
        this._redBatController = redBatController;
    }

    Tick(){
        const targetPos = {x: this._redBatController._enemyManager._target.x, y: this._redBatController._enemyManager._target.y};
        const batPos = {x: this._redBatController._parent.x, y: this._redBatController._parent.y};
        const direction = new Phaser.Math.Vector2(targetPos.x - batPos.x, targetPos.y - batPos.y).normalize();
        const speed = ENEMIES_STATS.redBat.speed * ENEMIES_BASE_STATS.speed;
        this._redBatController._parent.setVelocity(direction.x * speed, direction.y * speed);
    }

    OnEnterState(){
        console.log("Red bat attacks!");
        this._redBatController._enemyManager._attackUI.setVisible(true);

        //this._redBatController._initialPos = {
        //    x: this._redBatController._parent.x, 
        //    y: this._redBatController._parent.y
        //};
    }

    OnExitState(){
    }
}