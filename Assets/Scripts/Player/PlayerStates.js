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
        this._playerManager._parent.body.setVelocityY(-this._playerManager._playerStats.jumpVelocity);
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

export class PlayerLandState extends IState {
    constructor(playerManager) {
        super("player_land");
        this._playerManager = playerManager;
    }

    Tick(){
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_land");
    }

    OnExitState(){
    }
}

export class PlayerDashState extends IState {
    constructor(playerManager) {
        super("player_dash");
        this._playerManager = playerManager;
    }

    Tick(){
    }

    OnEnterState(){
        console.log(this._playerManager._parent.body.allowGravity);

        this._playerManager._dashAvailable = false;
        this._playerManager._isDashing = true;
        this._playerManager._parent.body.allowGravity = false;
        this._playerManager._parent.setVelocityY(0);
        this._playerManager._parent.anims.play("character_dash");
        this._playerManager._parent.setVelocityX(this._playerManager._parent.body.velocity.x > 0 ? this._playerManager._playerStats.dashVelocity : -this._playerManager._playerStats.dashVelocity);
        this._playerManager._dashTimeout = setTimeout(() => {
            this._playerManager._isDashing = false;
        }, this._playerManager._playerStats.dashDuration);
    }

    OnExitState(){
    }
}

export class PlayerDashingState extends IState {
    constructor(playerManager) {
        super("player_dashing");
        this._playerManager = playerManager;
    }

    Tick(){
        if(this._playerManager._parent.body.blocked.left || this._playerManager._parent.body.blocked.right){
            clearTimeout(this._playerManager._dashTimeout);
            this._playerManager._isDashing = false;
            console.log("resetDash")
        } 
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_dashing");
    }

    OnExitState(){
        this._playerManager._parent.body.allowGravity = true;
        setTimeout(() => {
            this._playerManager._dashAvailable = true;
        }, this._playerManager._playerStats.dashAvailableDuration);
    }
}