import Behaviour from "../components/Behaviour.js";
import StateMachine from "../components/StateMachine.js";
import { PlayerDashState, PlayerDashingState, PlayerFallingState, PlayerIdleState, PlayerJumpState, PlayerJumpingState, PlayerLandState, PlayerRunState } from "./PlayerStates.js";

export default class PlayerManager extends Behaviour {
    constructor(playerStats){
        super();
        this._playerStats = playerStats;
    }

    start(){
        this._scene = this._parent.scene;

        this._horizontalMovement = 0;
        this._isJumping = false;
        
        this._stateMachine = new StateMachine();

        var playerIdleState = new PlayerIdleState(this);
        var playerRunState = new PlayerRunState(this);
        var playerJumpState = new PlayerJumpState(this);
        var playerJumpingState = new PlayerJumpingState(this);
        var playerFallingState = new PlayerFallingState(this);
        var playerLandState = new PlayerLandState(this);
        var playerDashState = new PlayerDashState(this);
        var playerDashingState = new PlayerDashingState(this);

        // Idle --> Run
        this._stateMachine.AddTransition(playerIdleState, playerRunState, () => {
            return (this._horizontalMovement != 0);
        });

        // Run --> Idle
        this._stateMachine.AddTransition(playerRunState, playerIdleState, () => {
            return (this._horizontalMovement == 0);
        });

        // Idle/Run --> Jump
        this._stateMachine.AddTransition(playerIdleState, playerJumpState, () => {
            return (this._movementKeys.jump.isDown && this._canJump);
        });
        this._stateMachine.AddTransition(playerRunState, playerJumpState, () => {
            return (this._movementKeys.jump.isDown && this._canJump);
        });

        // Jump --> Jumping
        this._stateMachine.AddTransition(playerJumpState, playerJumpingState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Idle --> Falling
        this._stateMachine.AddTransition(playerIdleState, playerFallingState, () => {
            return (this._parent.body.velocity.y > 0);
        });

        // Run --> Falling
        this._stateMachine.AddTransition(playerRunState, playerFallingState, () => {
            return (this._parent.body.velocity.y > 0);
        });

        // Jumping --> Falling
        this._stateMachine.AddTransition(playerJumpingState, playerFallingState, () => {
            return (this._parent.body.velocity.y > 0);
        });

        // Falling --> Land
        this._stateMachine.AddTransition(playerFallingState, playerLandState, () => {
            return this._grounded;
        });

        // Land --> Idle
        this._stateMachine.AddTransition(playerLandState, playerIdleState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Running --> Dash
        this._stateMachine.AddTransition(playerRunState, playerDashState, () => {
            return this._movementKeys.dash.isDown && this._canDash;
        });

        // Jumping --> Dash
        this._stateMachine.AddTransition(playerJumpingState, playerDashState, () => {
            return (this._movementKeys.dash.isDown && this._canDash);
        });

        // Falling --> Dash
        this._stateMachine.AddTransition(playerFallingState, playerDashState, () => {
            return (this._movementKeys.dash.isDown && this._canDash);
        });

        // Dash --> Dashing
        this._stateMachine.AddTransition(playerDashState, playerDashingState, () => {
            return !this._parent.anims.isPlaying;
        });
        
        // Dashing --> Idle
        this._stateMachine.AddTransition(playerDashingState, playerIdleState, () => {
            return !this._isDashing;
        });

        this._stateMachine.SetState(playerIdleState);

        // inputs
        this._movementKeys = this._scene.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.Z, 
            jump_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            dash_arrow: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        });

        this._parent.flipX = false;
        this._dashAvailable = true;

        super.start();
    }

    update(){
        this._horizontalMovement = (this._movementKeys.left.isDown * -1) + (this._movementKeys.right.isDown * 1);
        if(!this._parent.body.blocked.down){
            setTimeout(() => {
                this._grounded = this._parent.body.blocked.down;
            }, PLAYER_GHOST_JUMP_DURATION);
        }
        else this._grounded = true;

        this._canJump = this._grounded;

        this._canDash = !this._parent.body.blocked.left;
        this._canDash = this._canDash && !this._parent.body.blocked.right;
        this._canDash = this._canDash && this._parent.body.velocity.x != 0;
        this._canDash = this._canDash && this._dashAvailable;

        this._stateMachine.Tick();       
    }
}