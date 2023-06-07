import IState from "../../Components/State.js";

export class BossSpawnState extends IState {
    constructor(bossController) {
        super("boss_spawn");
        this._bossController = bossController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Boss spawns!");
        this._bossController._parent.anims.play("bat_spawn");
    }

    OnExitState(){
        this._bossController._enemyManager._ready = true;
    }
}

export class BossTransitionState extends IState {
    constructor(bossController) {
        super("boss_transition");
        this._bossController = bossController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Boss transition!");
        this._bossController._parent.setVelocity(0);
        this._bossController._parent.body.enable = false;
        this._bossController._enemyManager._ready = false;
        this._bossController._enemyManager._invincible = true;

        var blinkCount = 0;
        const blinkInterval = setInterval(() => {
            this._bossController._parent.setVisible(!this._bossController._parent.visible);
            blinkCount++;
            if(blinkCount > 10) {
                this._bossController._parent.setVisible(true);
                this._bossController._enemyManager._ready = true;
                this._bossController._parent.body.enable = true;
                clearInterval(blinkInterval);
            }
        }, 200);
    }

    OnExitState(){
        this._bossController._enemyManager._invincible = false;
    }
}

export class BossGreenMoveState extends IState {
    constructor(bossController) {
        super("boss_greenMove");
        this._bossController = bossController;
    }

    Tick(){
        if(!this._bossController._enemyManager._ready) return;
        if(Math.abs(this._bossController._parent.body.velocity.x) < 0.1){
            this._velocity = -this._velocity;
        }
        this._bossController._parent.setVelocityX(this._velocity);
    }

    OnEnterState(){
        console.log("Boss moves (green)!");
        this._bossController._parent.setTint(ENEMIES_TINT.green);
        this._bossController._parent.anims.play("bat_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (this._bossController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed);
        this._bossController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}

export class BossPurpleMoveState extends IState {
    constructor(bossController) {
        super("boss_purpleMove");
        this._bossController = bossController;
    }

    Tick(){
        if(!this._bossController._enemyManager._ready) return;
        if(Math.abs(this._bossController._parent.body.velocity.x) < 0.1){
            this._velocity = -this._velocity;
        }
        this._bossController._parent.setVelocityX(this._velocity);
    }

    OnEnterState(){
        console.log("Boss moves (purple)!");
        this._bossController._parent.setTint(ENEMIES_TINT.purple);
        this._bossController._enemyManager._attackUI.setVisible(false);

        this._bossController._parent.anims.play("bat_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (this._bossController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed);
        this._bossController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}

export class BossPurpleAttackState extends IState {
    constructor(bossController) {
        super("boss_purpleAttack");
        this._bossController = bossController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Boss attacks (purple)!");

        this._bossController._enemyManager._attackUI.setVisible(true);

        this._bossController._enemyManager._busy = true;
        this._bossController._initialYPos = this._bossController._parent.y;
        this._bossController._parent.setVelocityX(0);

        var moveDown = this._bossController._parent.scene.tweens.add({
            targets: [this._bossController._parent],
            paused: false,
            ease: "Linear",
            duration: 1000,
            yoyo: false,
            y: `-=${this._bossController._enemyManager._parent.y + 32 - this._bossController._enemyManager._spawnY.max - 20}`,
            repeat: 0
        });
        moveDown.setCallback("onStart", () => {
            if(!this._bossController._parent.body) return;
            this._bossController._parent.setVelocityX(0);
        });
        moveDown.setCallback("onComplete", () => {
            if(!this._bossController._parent.body) return;
            var moveUp = this._bossController._parent.scene.tweens.add({
                targets: [this._bossController._parent],
                paused: false,
                ease: "Linear",
                duration: 1000,
                yoyo: false,
                y: `+=${this._bossController._initialYPos - this._bossController._enemyManager._spawnY.max + 32}`,
                repeat: 0
            });
            moveUp.setCallback("onComplete", () => {
                if(!this._bossController._parent.body) return;
                this._bossController._enemyManager._busy = false;
            });
        });
    }

    OnExitState(){
    }
}