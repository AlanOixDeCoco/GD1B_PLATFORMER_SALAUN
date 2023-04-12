var gameViewport = document.getElementById("game_viewport");

addEventListener("resize", onResizeWindow);

function onResizeWindow(){
    var gameZoomX = (window.innerWidth - (window.innerWidth % GAME_WIDTH)) / GAME_WIDTH;
    var gameZoomY = (window.innerHeight - (window.innerHeight % GAME_HEIGHT)) / GAME_HEIGHT;
    var gameZoom = gameZoomX < gameZoomY ? gameZoomX : gameZoomY;
    gameViewport.style.width = (GAME_WIDTH * gameZoom) + 'px';
}

onResizeWindow();

console.log(`%c Knight Climber - ${VERSION_NUMBER} `, 'background: #000; color: #00FF00');