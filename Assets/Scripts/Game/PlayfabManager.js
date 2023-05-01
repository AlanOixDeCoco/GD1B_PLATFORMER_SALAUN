export default class PlayfabManager {
    constructor(){
        SetupPlayfab(PLAYFAB_TITLE_ID);
        this._connected = false;
    }

    LoginAsGuest(username, successCallback, errorCallback){
        // create Playfab login request
        var LoginWithCustomIdRequest = {
            TitleId: PLAYFAB_TITLE_ID,
            CustomId: CreateGUID(username),
            CreateAccount: true
        };

        PlayFabClientSDK.LoginWithCustomID(LoginWithCustomIdRequest, (response, error) => {
            if(error) errorCallback(error);
            else {
                successCallback(response);
                this._connected = true;
            };
        });
    }

    Login(username, password, successCallback, errorCallback){
        // create Playfab login request
        var LoginWithUsernameRequest = {
            TitleId: PLAYFAB_TITLE_ID,
            Username: username,
            Password: password
        };

        PlayFabClientSDK.LoginWithPlayFab(LoginWithUsernameRequest, (response, error) => {
            if(error) errorCallback(error);
            else {
                successCallback(response);
                this._connected = true;
            };
        });
    }

    Register(username, password, confirmPassword, successCallback, errorCallback){
        if(password !== confirmPassword) {
            alert("Confirmation password doesn't match password!");
            return;
        }

        // create Playfab register request
        var RegisterWithUsernameRequest = {
            TitleId: PLAYFAB_TITLE_ID,
            Username: username,
            Password: password,
            RequireBothUsernameAndEmail: false
        };

        PlayFabClientSDK.RegisterPlayFabUser(RegisterWithUsernameRequest, (response, error) => {
            if(error) errorCallback(error);
            else {
                successCallback(response);
            };
        });
    }
}

function SetupPlayfab(titleID){
    if(!titleID || titleID == ""){
        OutputError("TitleId cannot be null");
        return;
    }
    else if(typeof PlayFab == 'undefined') { // make sure we have the SDK prior to calling / setting 
        OutputError("The PlayFab SDK could not be found. Double check your script sources");
        return;
    }
    PlayFab.settings.titleId = titleID;
    if(DEBUG) console.log(PlayFab);
}

function CreateGUID(username)
{
    if(localStorage.getItem("GUID")) return localStorage.getItem("GUID") + username;

    //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    localStorage.setItem("GUID", guid);
    return guid + username;
}