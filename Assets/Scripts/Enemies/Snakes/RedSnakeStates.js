import IState from "../../components/State.js";

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
        this._velocity = randomDirection * (ENEMIES_STATS.greenSnake.speed * ENEMIES_BASE_STATS.speed);
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
    }

    OnEnterState(){
        console.log("Red snake attacks!");
        this._redSnakeController._enemyManager._attackUI.setVisible(true);

        const direction = (this._redSnakeController._enemyManager._target.x - this._redSnakeController._parent.x) >= 0 ? 1 : -1;
        this._velocity = direction * (ENEMIES_STATS.greenSnake.speed * ENEMIES_BASE_STATS.speed);
        this._redSnakeController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}