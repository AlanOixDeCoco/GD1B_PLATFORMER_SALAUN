import Behaviour from "../Behaviour.js";
import StateMachine from "../components/StateMachine.js";
import { PlayerFallingState, PlayerIdleState, PlayerJumpState, PlayerJumpingState, PlayerRunState } from "./PlayerStates.js";

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
            return (this._movementKeys.jump.isDown && !this._parent._isJumping);
        });
        this._stateMachine.AddTransition(playerRunState, playerJumpState, () => {
            return (this._movementKeys.jump.isDown && !this._parent._isJumping);
        });

        // Jump --> Jumping
        this._stateMachine.AddTransition(playerJumpState, playerJumpingState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Jumping --> Falling
        this._stateMachine.AddTransition(playerJumpingState, playerFallingState, () => {
            return this._parent.body.velocity.y > 0;
        });

        // Falling --> Idle
        this._stateMachine.AddTransition(playerFallingState, playerIdleState, () => {
            return !this._isJumping;
        });

        this._stateMachine.SetState(playerIdleState);

        // inputs
        this._movementKeys = this._scene.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE, 
            jump_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        this._parent.flipX = false;

        super.start();
    }

    update(){
        this._horizontalMovement = (this._movementKeys.left.isDown * -1) + (this._movementKeys.right.isDown * 1);
        this._isJumping = !this._parent.body.blocked.down;

        this._stateMachine.Tick();       
    }
}