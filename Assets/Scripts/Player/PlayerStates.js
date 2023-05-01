import IState from "../components/State.js";

export class PlayerIdleState extends IState {
    constructor(playerManager) {
        super("player_idle");
        this._playerManager = playerManager;
    }

    Tick(){
    }

    OnEnterState(){
        this._playerManager._parent.setVelocityX(0);
        this._playerManager._parent.anims.play("character_idle");
    }

    OnExitState(){
    }
}

export class PlayerRunState extends IState {
    constructor(playerManager) {
        super("player_run");
        this._playerManager = playerManager;
    }

    Tick(){
        var horizontalMovement = this._playerManager._horizontalMovement * this._playerManager._playerStats.speed;
        this._playerManager._parent.setVelocityX(horizontalMovement);

        if(this._playerManager._parent.body.velocity.x < 0) this._playerManager._parent.flipX = true;
        if(this._playerManager._parent.body.velocity.x > 0) this._playerManager._parent.flipX = false;
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_run");
    }

    OnExitState(){
    }
}

export class PlayerJumpState extends IState {
    constructor(playerManager) {
        super("player_jump");
        this._playerManager = playerManager;
    }

    Tick(){
    }

    OnEnterState(){
        this._playerManager._parent.body.setVelocityY(-300);
        this._playerManager._parent.anims.play("character_jump");
    }

    OnExitState(){
    }
}

export class PlayerJumpingState extends IState {
    constructor(playerManager) {
        super("player_jumping");
        this._playerManager = playerManager;
    }

    Tick(){
        var horizontalMovement = this._playerManager._horizontalMovement * (this._playerManager._playerStats.speed);
        this._playerManager._parent.setVelocityX(horizontalMovement);

        if(this._playerManager._parent.body.velocity.x < 0) this._playerManager._parent.flipX = true;
        if(this._playerManager._parent.body.velocity.x > 0) this._playerManager._parent.flipX = false;
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_jumping");
    }

    OnExitState(){
    }
}

export class PlayerFallingState extends IState {
    constructor(playerManager) {
        super("player_falling");
        this._playerManager = playerManager;
    }

    Tick(){
        var horizontalMovement = this._playerManager._horizontalMovement * (this._playerManager._playerStats.speed);
        this._playerManager._parent.setVelocityX(horizontalMovement);

        if(this._playerManager._parent.body.velocity.x < 0) this._playerManager._parent.flipX = true;
        if(this._playerManager._parent.body.velocity.x > 0) this._playerManager._parent.flipX = false;
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_falling");
    }

    OnExitState(){
    }
}