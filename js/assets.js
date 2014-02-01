/* Preload assets to avoid texture popping */

assets = [];

for(i=0;i<scenes.length;i++){
	scene_name = scenes[i].name;
	assets.push("scenes/"+scene_name+"/background.png");
	assets.push("scenes/"+scene_name+"/far.png");
	assets.push("scenes/"+scene_name+"/mid.png");
}
assets.push("graphics/idle1.png");
assets.push("graphics/idle2.png");
assets.push("graphics/idle3.png");
assets.push("graphics/left1.png");
assets.push("graphics/left2.png");
assets.push("graphics/left3.png");
assets.push("graphics/left4.png");
assets.push("graphics/left5.png");
assets.push("graphics/right1.png");
assets.push("graphics/right2.png");
assets.push("graphics/right3.png");
assets.push("graphics/right4.png");
assets.push("graphics/right5.png");
assets.push("graphics/bubbleright.png");
assets.push("graphics/bubbleleft.png");
assets.push("graphics/bin of gold.png");
assets.push("graphics/lastnight.png");
assets.push("graphics/titleScreen.png");
assets.push("graphics/storyButton.png");
assets.push("graphics/jazzButton.png");
assets.push("graphics/left.png");
assets.push("graphics/leftdown.png");
assets.push("graphics/leftover.png");
assets.push("graphics/right.png");
assets.push("graphics/rightdown.png");
assets.push("graphics/rightover.png");
assets.push("graphics/confirm.png");
assets.push("graphics/confirmdown.png");
assets.push("graphics/confirmover.png");
assets.push("graphics/bar.png");
assets.push("graphics/ball.png");

for(i=0;i<arbitrary_objects.length;i++){
	assets.push(arbitrary_objects[i].path);
}

function loadAssets() {
	loader = new PIXI.AssetLoader(assets);
	loader.onComplete = imagesLoaded;
	loader.onProgress = loadProgress;
	loader.load();
}
function imagesLoaded() {
	var ready = soundLoaded();
	if (ready) {
		loadBar(loadingBar_size - loader.assetURLs.length);
		splashScreen();
		//startGame();
	} else {
		setTimeout(imagesLoaded, 500);
	}
}
