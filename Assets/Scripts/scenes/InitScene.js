import BehaviourScene from "../BehaviourScene.js";

export default class InitScene extends BehaviourScene{
    constructor() {
        super('init_scene');
    }

    preload(){
        // If we are already logged in
        if (PlayFab._internalSettings.authenticationContext.PlayFabId) {
            return;
        }

        SetupPlayfab(PLAYFAB_TITLE_ID);

        // create Playfab login request
        var LoginWithCustomIdRequest = {
            TitleId: PLAYFAB_TITLE_ID,
            CustomId: localStorage.getItem("GUID") ? localStorage.getItem("GUID") : CreateGUID(),
            CreateAccount: true
        };

        console.log("Logging into PlayFab...");
        PlayFabClientSDK.LoginWithCustomID(LoginWithCustomIdRequest, (response, error) => {
            if(error) this.onLoginFailed(error);
            else this.onLoginSuccess(response);
            clearInterval(this.loggingInterval);
        });
    }

    create(){
        if (PlayFab._internalSettings.authenticationContext.PlayFabId) {
            this.scene.start("sample_scene");
            return;
        }
        
        var loggingText = this.add.text(GAME_WIDTH/2 - 64, GAME_HEIGHT/2 - 18, "Logging in.", {fontFamily: "Monogram", fontSize: 36});
        var loggingDots = 2;
        this.loggingInterval = setInterval(()=>{
            loggingText.setText("Logging in" + '.'.repeat(loggingDots));
            loggingDots = loggingDots >= 3 ? 1 : loggingDots + 1;
        }, 500);
    }

    update(){
        console.log("Waiting for Playfab login...");
    }

    onLoginFailed(error){
        console.log(error);
    }

    onLoginSuccess(response){
        // display account details
        var result = response.data;
        var status = "Login Successful. <br \\> Welcome Player: " + result.PlayFabId + "<br \\> Your session ticket is: " + result.SessionTicket;
        console.log(status);

        // start next scene
        this.scene.start("sample_scene");
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
}

function CreateGUID()
{
    //http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    localStorage.setItem("GUID", guid);
    return guid;
}
//#endregion