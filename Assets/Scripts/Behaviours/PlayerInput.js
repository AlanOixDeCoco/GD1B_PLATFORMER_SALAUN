import Behaviour from "../Behaviour.js";

export default class PlayerInput extends Behaviour{
    start(){
        this._scene = this._parent.scene;
        this._movementKeys;

        this._playerSpeed = 128;

        // inputs
        this._movementKeys = this._scene.input.keyboard.addKeys({
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE, 
            jump_arrow: Phaser.Input.Keyboard.KeyCodes.UP, 
            left: Phaser.Input.Keyboard.KeyCodes.Q, 
            left_arrow: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.D, 
            right_arrow: Phaser.Input.Keyboard.KeyCodes.RIGHT
        });

        super.start();
    }

    update(){
        var horizontalMove = (this._movementKeys.left.isDown * -1) + (this._movementKeys.right.isDown * 1);
        horizontalMove *= this._playerSpeed;
        this._parent.setVelocityX(horizontalMove, this._parent.body.velocity.y);

        //#region jump
        if(this._movementKeys.jump.isDown && !this.testCharacter.isJumping){
            this._parent.body.setVelocityY(-150);
        }
        //#endregion

        this._parent.isJumping = !this._parent.body.blocked.down;
    }
}