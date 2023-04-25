let behaviourMixin = {
    update(time, deltatime){

    }
}


export default class BehaviourScene extends Phaser.Scene {
    constructor(key, active = true, visible = true) {
        super({key: key, active: active, visible: visible});
        this._behaviourObjects = [];
    }

    
    
    update(time, deltatime){
        this._behaviourObjects.forEach(behaviourObject => {
            behaviourObject.update(time, deltatime);
        });
    }

    MakeBehaviour(gameobject){
        // Gameobject modification
        gameobject._behaviours = {};
        gameobject.update = (time, deltatime) => {
            for(let identifier in gameobject._behaviours){
                gameobject._behaviours[identifier].update(time, deltatime);
            }
        };
        gameobject.AddBehaviour = (behaviour, identifier = "unamed behaviour") => {
            behaviour.init(gameobject, identifier);
        };
        gameobject.on('destroy', () => {
            for(let identifier in gameobject._behaviours){
                gameobject._behaviours[identifier].destroy();
                delete gameobject._behaviours[identifier];
            }
        })

        // Add the modified gameobject to the scene update loop
        this._behaviourObjects.push(gameobject);
    }
}