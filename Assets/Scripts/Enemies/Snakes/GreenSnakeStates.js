import IState from "../../Components/State.js";

export class GreenSnakeSpawnState extends IState {
    constructor(greenSnakeController) {
        super("greenSnake_spawn");
        this._greenSnakeController = greenSnakeController;
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Green snake spawns!");
        this._greenSnakeController._parent.anims.play("snake_spawn");
    }

    OnExitState(){
        this._greenSnakeController._enemyManager._ready = true;
    }
}

export class GreenSnakeMoveState extends IState {
    constructor(greenSnakeController) {
        super("greenSnake_move");
        this._greenSnakeController = greenSnakeController;
    }

    Tick(){
        if(Math.abs(this._greenSnakeController._parent.body.velocity.x) < 0.1){
            this._velocity = -this._velocity;
            this._greenSnakeController._parent.setVelocityX(this._velocity);
        }
    }

    OnEnterState(){
        console.log("Green snake moves!");
        this._greenSnakeController._parent.body.allowGravity = true;
        this._greenSnakeController._parent.anims.play("snake_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (this._greenSnakeController._enemyManager._stats.speed * ENEMIES_BASE_STATS.speed);
        this._greenSnakeController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}