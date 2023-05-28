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
        var horizontalMovement = this._playerManager._horizontalMovement * (this._playerManager._playerStats.speed);
        this._playerManager._parent.setVelocityX(horizontalMovement / 1.5);
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
        }, this._playerManager._playerStats.dashRecoverTime);
    }
}

export class PlayerAttackStaticState extends IState {
    constructor(playerManager) {
        super("player_attack_static");
        this._playerManager = playerManager;

        this._playerManager._scene.anims.create({
            key: 'character_sword_area_attackStatic',
            frames: this._playerManager._scene.anims.generateFrameNames("sword_areas_atlas", {
                prefix: 'attackStatic_',
                suffix: '.png',
                start: 0,
                end: 6,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
    }

    Tick(){
        
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_attackStatic");

        var swordArea = this._playerManager._scene.physics.add.sprite(this._playerManager._parent.x, this._playerManager._parent.y, "character_sword_areas", 0);
        swordArea.body.allowGravity = false;
        swordArea.body.immovable = true;
        swordArea.setDepth(LAYERS.player + 1);
        swordArea.setOrigin(0.5, 1.2);
        swordArea.flipX = this._playerManager._parent.flipX;
        swordArea.setVelocityX((this._playerManager._parent.flipX ? -1 : 1) * PLAYER_DEFAULT_ATTACK_SPEED);
        setTimeout(() => {
            swordArea.destroy();
        }, PLAYER_DEFAULT_ATTACK_LIFETIME);

        swordArea.anims.play("character_sword_area_attackStatic");
    }

    OnExitState(){
    }
}

export class PlayerAttackRunState extends IState {
    constructor(playerManager) {
        super("player_attack_run");
        this._playerManager = playerManager;

        this._playerManager._scene.anims.create({
            key: 'character_sword_area_attackRun',
            frames: this._playerManager._scene.anims.generateFrameNames("sword_areas_atlas", {
                prefix: 'attackRun_',
                suffix: '.png',
                start: 0,
                end: 6,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
    }

    Tick(){
        
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_attackRun");
        this._playerManager._parent.setVelocityX(0);

        var swordArea = this._playerManager._scene.physics.add.sprite(this._playerManager._parent.x, this._playerManager._parent.y, "character_sword_areas", 0);
        swordArea.body.allowGravity = false;
        swordArea.body.immovable = true;
        swordArea.setDepth(LAYERS.player + 1);
        swordArea.setOrigin(0.5, 1.2);
        swordArea.flipX = this._playerManager._parent.flipX;
        swordArea.x += (this._playerManager._parent.flipX ? -1 : 1) * 12;
        swordArea.setVelocityX((this._playerManager._parent.flipX ? -1 : 1) * PLAYER_DEFAULT_ATTACK_SPEED * 1.25);
        setTimeout(() => {
            swordArea.destroy();
        }, PLAYER_DEFAULT_ATTACK_LIFETIME * 1.25);

        swordArea.anims.play("character_sword_area_attackRun");
    }

    OnExitState(){
    }
}

export class PlayerAttackJumpState extends IState {
    constructor(playerManager) {
        super("player_attack_jump");
        this._playerManager = playerManager;

        this._playerManager._scene.anims.create({
            key: 'character_sword_area_attackJump',
            frames: this._playerManager._scene.anims.generateFrameNames("sword_areas_atlas", {
                prefix: 'attackJump_',
                suffix: '.png',
                start: 0,
                end: 9,
                zeroPad: 2
            }),
            frameRate: 60,
            repeat: 0,
        });
    }

    Tick(){
        
    }

    OnEnterState(){
        this._playerManager._parent.anims.play("character_attackJump");
        this._playerManager._parent.setVelocityY(0);
        
        var swordArea = this._playerManager._scene.physics.add.sprite(this._playerManager._parent.x, this._playerManager._parent.y, "character_sword_areas", 0);
        swordArea.body.allowGravity = false;
        swordArea.body.immovable = true;
        swordArea.setDepth(LAYERS.player + 1);
        swordArea.setOrigin(0.5, 1.2);
        swordArea.flipX = this._playerManager._parent.flipX;
        swordArea.x += this._playerManager._parent.flipX ? 
            (-8 + (this._playerManager._parent.body.velocity.x) / 10) : 
            (8 + ((this._playerManager._parent.body.velocity.x) / 10));
        swordArea.setVelocityX((this._playerManager._parent.flipX ? -1 : 1) * PLAYER_DEFAULT_ATTACK_SPEED);
        swordArea.setVelocityY(PLAYER_DEFAULT_ATTACK_SPEED);
        setTimeout(() => {
            swordArea.destroy();
        }, PLAYER_DEFAULT_ATTACK_LIFETIME);

        swordArea.anims.play("character_sword_area_attackJump");
    }

    OnExitState(){
    }
}