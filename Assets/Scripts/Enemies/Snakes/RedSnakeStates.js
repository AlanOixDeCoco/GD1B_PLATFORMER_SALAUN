import IState from "../../Components/State.js";

export class RedSnakeSpawnState extends IState {
    constructor(redSnakeController) {
        super("redSnake_spawn");
        this._redSnakeController = redSnakeController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Red snake spawns!");
        this._redSnakeController._parent.anims.play("snake_spawn");
    }

    OnExitState(){
        this._redSnakeController._enemyManager._ready = true;
    }
}

export class RedSnakePatrolState extends IState {
    constructor(redSnakeController) {
        super("redSnake_patrol");
        this._redSnakeController = redSnakeController;
    }

    Tick(){
        if(!this._redSnakeController._enemyManager._ready) return;
        if(Math.abs(this._redSnakeController._parent.body.velocity.x) < 0.1){
            this._velocity = -this._velocity;
            this._redSnakeController._parent.setVelocityX(this._velocity);
        }
    }

    OnEnterState(){
        console.log("Red snake patrols!");
        this._redSnakeController._enemyManager._attackUI.setVisible(false);

        if(this._redSnakeController._parent.body.velocity.x != 0) return;

        this._redSnakeController._parent.body.allowGravity = true;
        this._redSnakeController._parent.anims.play("snake_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (this._redSnakeController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed);
        this._redSnakeController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}

export class RedSnakeAttackState extends IState {
    constructor(redSnakeController) {
        super("redSnake_attack");
        this._redSnakeController = redSnakeController;
    }

    Tick(){
        if(!this._redSnakeController._enemyManager._ready) return;
        const targetPos = {x: this._redSnakeController._enemyManager._target.x, y: this._redSnakeController._parent.y};
        const snakePos = {x: this._redSnakeController._parent.x, y: this._redSnakeController._parent.y};
        const direction = new Phaser.Math.Vector2(targetPos.x - snakePos.x, targetPos.y - snakePos.y).normalize();
        const speed = this._redSnakeController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed;
        this._redSnakeController._parent.setVelocityX(direction.x * speed);
    }

    OnEnterState(){
        console.log("Red snake attacks!");
        this._redSnakeController._enemyManager._attackUI.setVisible(true);
    }

    OnExitState(){
    }
}