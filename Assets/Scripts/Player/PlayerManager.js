import Behaviour from "../Components/Behaviour.js";
import StateMachine from "../Components/StateMachine.js";
import PlayerAura from "./PlayerAura.js";
import { PlayerAttackJumpState, PlayerAttackRunState, PlayerAttackStaticState, PlayerDashState, PlayerDashingState, PlayerFallingState, PlayerIdleState, PlayerJumpState, PlayerJumpingState, PlayerLandState, PlayerRunState } from "./PlayerStates.js";

export default class PlayerManager extends Behaviour {
    constructor(gameManager){
        super();
        this._gameManager = gameManager;
        this._gamepad = null;
        this._isGamepadConnected = false;
        this._alive = true;
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

        var playerAttackStaticState = new PlayerAttackStaticState(this);
        var playerAttackRunState = new PlayerAttackRunState(this);
        var playerAttackJumpState = new PlayerAttackJumpState(this);

        // Idle --> Run
        this._stateMachine.AddTransition(playerIdleState, playerRunState, () => {
            return (this._horizontalMovement != 0);
        });

        // Idle --> Attack static
        this._stateMachine.AddTransition(playerIdleState, playerAttackStaticState, () => {
            return (this._attack);
        });

        // Attack static --> Idle
        this._stateMachine.AddTransition(playerAttackStaticState, playerIdleState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Run --> Idle
        this._stateMachine.AddTransition(playerRunState, playerIdleState, () => {
            return (this._horizontalMovement == 0);
        });

        // Run --> Attack run
        this._stateMachine.AddTransition(playerRunState, playerAttackRunState, () => {
            return (this._attack);
        });

        // Attack run --> Run
        this._stateMachine.AddTransition(playerAttackRunState, playerRunState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Idle/Run/Falling (ghost jump) --> Jump
        this._stateMachine.AddTransition(playerIdleState, playerJumpState, () => {
            return (this._jump && this._canJump);
        });
        this._stateMachine.AddTransition(playerRunState, playerJumpState, () => {
            return (this._jump && this._canJump);
        });
        this._stateMachine.AddTransition(playerFallingState, playerJumpState, () => {
            return (this._jump && this._canJump);
        });

        // Jump --> Jumping
        this._stateMachine.AddTransition(playerJumpState, playerJumpingState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Jumping --> Attack jump
        this._stateMachine.AddTransition(playerJumpingState, playerAttackJumpState, () => {
            return (this._attack);
        });

        // Falling --> Attack jump
        this._stateMachine.AddTransition(playerFallingState, playerAttackJumpState, () => {
            return (this._attack);
        });

        // Attack jump --> Idle
        this._stateMachine.AddTransition(playerAttackJumpState, playerIdleState, () => {
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
            return this._parent.body.blocked.down;
        });

        // Land --> Idle
        this._stateMachine.AddTransition(playerLandState, playerIdleState, () => {
            return !this._parent.anims.isPlaying;
        });

        // Running --> Dash
        this._stateMachine.AddTransition(playerRunState, playerDashState, () => {
            return (this._dash && this._canDash);
        });

        // Jumping --> Dash
        this._stateMachine.AddTransition(playerJumpingState, playerDashState, () => {
            return (this._dash && this._canDash);
        });

        // Falling --> Dash
        this._stateMachine.AddTransition(playerFallingState, playerDashState, () => {
            return (this._dash && this._canDash);
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
        this._keyboardKeys = this._scene.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.Z,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            bottom: Phaser.Input.Keyboard.KeyCodes.S,
            dash: Phaser.Input.Keyboard.KeyCodes.SHIFT,
            attack: Phaser.Input.Keyboard.KeyCodes.SPACE,
            interact: Phaser.Input.Keyboard.KeyCodes.F,
        });

        this.AssignGamepadEvents();

        this._parent.flipX = false;
        this._dashAvailable = true;

        super.start();
    }

    update(){
        if(!this._alive) return;

        // Gamepad inputs handling
        if(this._gamepad){
            // Horizontal movement input handling
            if(this._gamepad.leftStick.x != 0){
                this._horizontalMovement = this._gamepad.leftStick.x;
            } 
            else {
            this._horizontalMovement = (this._gamepad.isButtonDown(BUTTON_LEFT) * -1) + (this._gamepad.isButtonDown(BUTTON_RIGHT) * 1);
            }

            // Attack input handling
            this._attack = this._gamepad.isButtonDown(BUTTON_ATTACK);

            // Interaction input handling
            this._interact = this._gamepad.isButtonDown(BUTTON_INTERACT);

            // Jump input handling
            this._jump = this._gamepad.isButtonDown(BUTTON_JUMP);

            // Dash input handling
            this._dash = this._gamepad.isButtonDown(BUTTON_DASH);

            // Ignore platform handling
            if(this._gamepad.leftStick.y > 0.8) this._ignorePlatformButton = true;
            else this._ignorePlatformButton = this._gamepad.isButtonDown(BUTTON_DOWN);
        } 
        // Keyboard inputs handling
        else {
            // Horizontal movement input handling
            this._horizontalMovement = (this._keyboardKeys.left.isDown * -1) + (this._keyboardKeys.right.isDown * 1);

            // Attack input handling
            this._attack = this._keyboardKeys.attack.isDown;

            // Interaction input handling
            this._interact = this._keyboardKeys.interact.isDown;

            // Jump input handling
            this._jump = this._keyboardKeys.jump.isDown;

            // Dash input handling
            this._dash = this._keyboardKeys.dash.isDown;

            // Ignore platform handling
            this._ignorePlatformButton = this._keyboardKeys.bottom.isDown;
        }

        // Animation speed handling
        if(this._parent.anims.currentAnim.key == "character_run"){
            this._parent.anims.msPerFrame = 1000 / (80 * Math.max(Math.abs(this._horizontalMovement), 0.01));
        }

        // Jump (with tolerance)
        if(!this._parent.body.blocked.down){
            this._groundedTimeout = setTimeout(() => {
                this._grounded = this._parent.body.blocked.down;
            }, PLAYER_GHOST_JUMP_DURATION);
        }
        else this._grounded = true;
        this._canJump = this._grounded;

        // Get off platform
        if(this._parent.body.blocked.down && this._ignorePlatformButton) {
            this._ignorePlatform = true;
            this._ignorePlatformTimeout = setTimeout(() => {
                this._ignorePlatform = false;
            }, 200);
        }

        // Dash availability
        this._canDash = !this._parent.body.blocked.left;
        this._canDash = this._canDash && !this._parent.body.blocked.right;
        this._canDash = this._canDash && this._parent.body.velocity.x != 0;
        this._canDash = this._canDash && this._dashAvailable;

        // Update the statemachine each frame
        this._stateMachine.Tick();
    }

    TakeDamage(enemySprite){
        // Deal damage to the player
        var enemyStats = enemySprite.GetBehaviour("enemyManager")._stats;
        this._gameManager._data.playerStats.health -= enemyStats.damage;

        // Call UI update
        this._parent.GetBehaviour("player_UI_controller").UpdateHealthFill();

        // Kill player if health at 0
        if(this._gameManager._data.playerStats.health <= 0){
            this.Die();
            return;
        }

        // Set invincible & blink during invincible duration
        this._invincible = true;
        var blinkVisible = true;
        var blinkInterval = setInterval(() => {
            blinkVisible = !blinkVisible;
            this._parent.setAlpha(blinkVisible ? 1 : 0);
        }, 100);

        // Reset invincibility after the invincible duration
        this._endInvicibleTimeout = setTimeout(() => {
            clearInterval(blinkInterval);
            this._parent.setAlpha(1);
            this._invincible = false;
        }, this._gameManager._data.playerStats.invincibleDuration);
    }

    Die(){
        console.log("Player dies!");
        this._alive = false;
        this._gameManager._ended = true;
        
        // Death animation
        // Create new soul pickup
        var soulSprite = this._scene.physics.add.sprite(this._parent.x, this._parent.y - 16, SPRITE_KEYS.playerSoul);
        soulSprite.setDepth(LAYERS.player)
        .setOrigin(.5, .5)
        .setPipeline("Light2D");

        soulSprite.setVelocity(0, -300);
        soulSprite.setBounce(0.5);
        soulSprite.body.setDrag(125);
        soulSprite.body.setCircle(10, -5, -5);

        this._scene.MakeBehaviors(soulSprite, {
            "playerAura": new PlayerAura(),
        });
        
        this._scene._soulsGroup.add(soulSprite);

        this._parent.destroy();

        // Then switch to gameover scene
        setTimeout(() => {
            this._scene.scene.start(SCENE_GAMEOVER, {gameManager: this._gameManager});
        }, 1000);
    }

    AssignGamepadEvents(){
        // setup the controller connected/disconnected event
        this._scene.input.gamepad.on('connected', this.onGamepadConnect, this);
        this._scene.input.gamepad.on('disconnected', this.onGamepadDisconnect, this);

        this.TryConnect();
    }

    TryConnect(){
        if(this._scene.input.gamepad.pad1){
            this.onGamepadConnect();
        }
    }

    onGamepadConnect(){
        console.log("Controller connected!");

        this._gamepad = this._scene.input.gamepad.pad1;
        this._isGamepadConnected = true;
    }

    // called when the gamepad is disconnected
    onGamepadDisconnect(){
        console.log("Controller disconnected!");

        // clear the gamepad
        this._gamepad = null;
        this._isGamepadConnected = false;

        // resets inputs when disconnected
        this.ResetInputs();
    }

    destroy(){
        clearInterval(this._endInvicibleTimeout);
        clearInterval(this._groundedTimeout);
        clearInterval(this._ignorePlatformTimeout);
    }
}