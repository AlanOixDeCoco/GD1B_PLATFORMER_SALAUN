import IState from "../../components/State.js";

export class GreenSnakeSpawnState extends IState {
    constructor(greenSnakeController) {
        super("greenSnake_spawn");
        this._greenSnakeController = greenSnakeController;

        this._greenSnakeController._parent.anims.create({
            key: 'greenSnake_spawn',
            frames: this._greenSnakeController._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_idle_',
                suffix: '.png',
                start: 0,
                end: 10,
                zeroPad: 2
            }),
            frameRate: 10,
            repeat: 0,
        });
    }

    Tick(){
    }

    OnEnterState(){
        console.log("Green snake spawns!");
        this._greenSnakeController._parent.anims.play("greenSnake_spawn");
    }

    OnExitState(){
        this._greenSnakeController._enemyManager._ready = true;
    }
}

export class GreenSnakeMoveState extends IState {
    constructor(greenSnakeController) {
        super("greenSnake_move");
        this._greenSnakeController = greenSnakeController;

        this._greenSnakeController._parent.anims.create({
            key: 'greenSnake_move',
            frames: this._greenSnakeController._parent.anims.generateFrameNames("character_atlas", {
                prefix: 'character_run_',
                suffix: '.png',
                start: 0,
                end: 46,
                zeroPad: 2
            }),
            frameRate: 80,
            repeat: -1,
        });
    }

    Tick(){
        if(Math.abs(this._greenSnakeController._parent.body.velocity.x) < 0.1){
            this._velocity = -this._velocity;
            this._greenSnakeController._parent.setVelocityX(this._velocity);
        }
    }

    OnEnterState(){
        console.log("Green snake moves!");
        this._greenSnakeController._parent.anims.play("greenSnake_move");

        var randomDirection = Math.random() >= 0.5 ? 1 : -1;
        this._velocity = randomDirection * (ENEMIES_STATS.greenSnake.speed * ENEMIES_BASE_STATS.speed);
        this._greenSnakeController._parent.setVelocityX(this._velocity);
    }

    OnExitState(){
    }
}