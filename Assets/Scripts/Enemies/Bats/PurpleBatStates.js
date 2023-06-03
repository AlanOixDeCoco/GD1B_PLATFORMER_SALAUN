import IState from "../../Components/State.js";

export class PurpleBatSpawnState extends IState {
    constructor(purpleBatController) {
        super("purpleBat_spawn");
        this._purpleBatController = purpleBatController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Purple bat spawns!");
        this._purpleBatController._parent.anims.play("bat_spawn");
    }

    OnExitState(){
        this._purpleBatController._enemyManager._ready = true;
    }
}

export class PurpleBatMoveState extends IState {
    constructor(purpleBatController) {
        super("purpleBat_move");
        this._purpleBatController = purpleBatController;
    }

    Tick(){
        if(this._movingVertically) return;
        if(Math.abs(this._purpleBatController._parent.body.velocity.x) < 0.1){
            if(this._purpleBatController._parent.y < this._purpleBatController._enemyManager._spawnY.max - 32){
                this._purpleBatController._enemyManager._busy = true;
                var moveDown = this._purpleBatController._parent.scene.tweens.add({
                    targets: [this._purpleBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: "+=32",
                    repeat: 0
                });
                moveDown.setCallback("onStart", () => {
                    if(!this._purpleBatController._parent.body) return;
                    this._purpleBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveDown.setCallback("onComplete", () => {
                    if(!this._purpleBatController._parent.body) return;
                    this._purpleBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                    this._purpleBatController._enemyManager._busy = false;
                });
            }
            else {
                this._purpleBatController._enemyManager._busy = true;
                var moveUp = this._purpleBatController._parent.scene.tweens.add({
                    targets: [this._purpleBatController._parent],
                    paused: false,
                    ease: "Linear",
                    duration: 1000,
                    yoyo: false,
                    y: `+=${this._purpleBatController._enemyManager._spawnY.min - this._purpleBatController._enemyManager._spawnY.max}`,
                    repeat: 0
                });
                moveUp.setCallback("onStart", () => {
                    if(!this._purpleBatController._parent.body) return;
                    this._purpleBatController._parent.setVelocityX(0);
                    this._velocity = -this._velocity;
                    this._movingVertically = true;
                });
                moveUp.setCallback("onComplete", () => {
                    if(!this._purpleBatController._parent.body) return;
                    this._purpleBatController._parent.setVelocityX(this._velocity);
                    this._movingVertically = false;
                    this._purpleBatController._enemyManager._busy = false;
                });
            }
        }
    }

    OnEnterState(){
        console.log("Purple bat moves!");
        this._purpleBatController._enemyManager._attackUI.setVisible(false);

        if(this._velocity) {
            this._purpleBatController._parent.setVelocityX(this._velocity);
            return;
        }

        this._purpleBatController._parent.anims.play("bat_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (ENEMIES_STATS.greenBat.speed * ENEMIES_BASE_STATS.speed);
        this._purpleBatController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}

export class PurpleBatAttackState extends IState {
    constructor(purpleBatController) {
        super("purpleBat_attack");
        this._purpleBatController = purpleBatController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Purple bat attacks!");
        this._purpleBatController._enemyManager._attackUI.setVisible(true);

        this._purpleBatController._enemyManager._busy = true;
        this._purpleBatController._initialYPos = this._purpleBatController._parent.y;
        this._purpleBatController._parent.setVelocityX(0);

        var moveDown = this._purpleBatController._parent.scene.tweens.add({
            targets: [this._purpleBatController._parent],
            paused: false,
            ease: "Linear",
            duration: 1000,
            yoyo: false,
            y: `-=${this._purpleBatController._enemyManager._parent.y + 32 - this._purpleBatController._enemyManager._spawnY.max}`,
            repeat: 0
        });
        moveDown.setCallback("onStart", () => {
            if(!this._purpleBatController._parent.body) return;
            this._purpleBatController._parent.setVelocityX(0);
        });
        moveDown.setCallback("onComplete", () => {
            if(!this._purpleBatController._parent.body) return;
            var moveUp = this._purpleBatController._parent.scene.tweens.add({
                targets: [this._purpleBatController._parent],
                paused: false,
                ease: "Linear",
                duration: 1000,
                yoyo: false,
                y: `+=${this._purpleBatController._initialYPos - this._purpleBatController._enemyManager._spawnY.max + 32}`,
                repeat: 0
            });
            moveUp.setCallback("onComplete", () => {
                if(!this._purpleBatController._parent.body) return;
                this._purpleBatController._enemyManager._busy = false;
            });
        });
    }

    OnExitState(){
    }
}