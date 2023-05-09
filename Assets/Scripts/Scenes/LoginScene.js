import CameraController from "../Camera/CameraController.js";
import BehaviourScene from "../components/BehaviourScene.js";
import LoginPopup from "../components/LoginPopup.js";

export default class LoginScene extends BehaviourScene {
    constructor() {
        super(SCENE_LOGIN, false);
        this._loginPopup = new LoginPopup();
    }

    init(data){
        this._gameManager = data.gameManager;
        this._gameManager.SetCurrentScene(this);
    }

    create(){
        this._gameManager._playfabManager._connected = false;
        
        // If we are already logged in
        if (PlayFab._internalSettings.authenticationContext.PlayFabId) {
            this.scene.start(SCENE_MAIN_MENU);
        }

        // Display the Login popup
        this._loginPopup.ShowPopup(localStorage.getItem("loginPopupState"));

        // connect the callbacks
        this._loginPopup.SetGuestCallback((username) => {
            this._gameManager._playfabManager.LoginAsGuest(username, (response) => {
                console.log("connected!");
                console.log(response);
                this._loginPopup.HidePopup();
                this.scene.start(SCENE_MAIN_MENU, {gameManager: this._gameManager});
            }, (error) => {
                console.log(error.errorMessage);
            });
        });

        this._loginPopup.SetLoginCallback((username, password) => {
            this._gameManager._playfabManager.Login(username, password, (response) => {
                console.log("connected!");
                console.log(response);
                this._loginPopup.HidePopup();
                this.scene.start(SCENE_MAIN_MENU, {gameManager: this._gameManager});
            }, (error) => {
                alert(error.errorMessage);
            });
        });

        this._loginPopup.SetRegisterCallback((username, password, confirmPassword) => {
            this._gameManager._playfabManager.Register(username, password, confirmPassword, (response) => {
                console.log("connected!");
                console.log(response);
                this._loginPopup.HidePopup();
                this._gameManager._playfabManager.Login(username, password, (response) => {
                    console.log("connected!");
                    console.log(response);
                    this._loginPopup.HidePopup();
                    this.scene.start(SCENE_MAIN_MENU, {gameManager: this._gameManager});
                }, (error) => {
                    alert(error.errorMessage);
                });
            }, (error) => {
                alert(error.errorMessage);
            });
        });

        this._loginPopup.SetPlayLocalCallback(() => {
            console.log("playing local!");
            this._loginPopup.HidePopup();
            this.scene.start(SCENE_MAIN_MENU, {gameManager: this._gameManager});
        });
    }
}