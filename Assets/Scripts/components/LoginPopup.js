export default class LoginPopup {
    constructor(){
        this._overlayElement = document.getElementById("overlay");

        this._menuTitle = document.getElementById("menuTitle");
        this._nextLoginOptionButton = document.getElementById("nextLoginOptionButton");
        this._inputFields = {
            username: document.getElementById("usernameField"),
            password: document.getElementById("passwordField"),
            confirmPassword: document.getElementById("confirmPasswordField"),
        }
        this._buttons = {
            guest: document.getElementById("loginGuestButton"),
            login: document.getElementById("loginButton"),
            register: document.getElementById("registerButton"),
            local: document.getElementById("localButton"),
        }

        this._nextLoginOptionButton.onclick = () => {this.SwitchLoginOption()};
    }

    HidePopup(){
        this._overlayElement.style.display = "none";
    }

    ShowPopup(state){
        this.ResetPopup();
        switch(state){
            default:
            case "guest":
                this._menuTitle.innerText = "GUEST";
                this._inputFields.username.style.display = "flex";
                this._buttons.guest.style.display = "flex";
                localStorage.setItem("loginPopupState", state);
                break;
            case "login":
                this._menuTitle.innerText = "LOGIN";
                this._inputFields.username.style.display = "flex";
                this._inputFields.password.style.display = "flex";
                this._buttons.login.style.display = "flex";
                document.getElementById("passwordInput").value = localStorage.getItem("savedPassword") ? localStorage.getItem("savedPassword") : "";
                localStorage.setItem("loginPopupState", state);
                break;
            case "register":
                this._menuTitle.innerText = "REGISTER";
                this._inputFields.username.style.display = "flex";
                this._inputFields.password.style.display = "flex";
                this._inputFields.confirmPassword.style.display = "flex";
                this._buttons.register.style.display = "flex";
                localStorage.setItem("loginPopupState", "login");
                break;
        }
        document.getElementById("usernameInput").value = localStorage.getItem("savedUsername") ? localStorage.getItem("savedUsername") : "Username";

        this._currentState = state;
        this._overlayElement.style.display = "flex";
    }

    ResetPopup(){
        for(var identifier in this._inputFields){
            this._inputFields[identifier].style.display = "none";
        }
        for(var identifier in this._buttons){
            this._buttons[identifier].style.display = "none";
        }
        this._buttons.local.style.display = "flex";
    }

    SwitchLoginOption(){
        switch(this._currentState){
            default:
            case "guest":
                this.ShowPopup("login");
                break;
            case "login":
                this.ShowPopup("register");
                break;
            case "register":
                this.ShowPopup("guest");
                break;
        }
    }

    SetGuestCallback(callback){
        this._buttons.guest.onclick = (() => {
            callback(document.getElementById("usernameInput").value);
            localStorage.setItem("savedUsername", document.getElementById("usernameInput").value);
        });
    }

    SetLoginCallback(callback){
        this._buttons.login.onclick = (() => {
            callback(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value);
            localStorage.setItem("savedUsername", document.getElementById("usernameInput").value);
            localStorage.setItem("savedPassword", document.getElementById("passwordInput").value);
        });
    }

    SetRegisterCallback(callback){
        this._buttons.register.onclick = (() => {
            callback(document.getElementById("usernameInput").value, document.getElementById("passwordInput").value, document.getElementById("confirmPasswordInput").value);
            localStorage.setItem("savedUsername", document.getElementById("usernameInput").value);
            localStorage.setItem("savedPassword", document.getElementById("passwordInput").value);
        });
    }

    SetPlayLocalCallback(callback){
        this._buttons.local.onclick = () => {
            callback();
        }
    }
}