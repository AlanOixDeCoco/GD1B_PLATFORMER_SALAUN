//#region imports
import SampleScene from "./scenes/SampleScene.js";
//#endregion

//#region FUNCTIONS
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

// #region GAME CONFIGURATION
const config = {
    type: Phaser.WEBGL,
    scale: {
        parent: 'game_viewport',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH, 
        height: GAME_HEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 9.81 * 32 },
            debug: DEBUG
        }
    },
    pixelArt: true,
    scene: [
        SampleScene
    ],
    input: {
        gamepad: true,
    },
};
// #endregion

let game = new Phaser.Game(config); // creates the game object
SetupPlayfab(PLAYFAB_TITLE_ID);

// build http request object for LoginWithCustomId
var LoginWithCustomIdRequest = {
    TitleId: PLAYFAB_TITLE_ID,
    CustomId: localStorage.getItem("GUID") ? localStorage.getItem("GUID") : CreateGUID(),
    CreateAccount: true
};

console.log("Logging into PlayFab...");
PlayFabClientSDK.LoginWithCustomID(LoginWithCustomIdRequest, (response, error) => {
    if(error)
    {
      console.log(error);
    } 
    else
    {
      // display account details
      var result = response.data;
      var status = "Login Successful. <br \\> Welcome Player: " + result.PlayFabId + "<br \\> Your session ticket is: " + result.SessionTicket;
      console.log(status);
    }
});

console.log(`${GAME_TITLE} - Version ${GAME_VERSION}`);