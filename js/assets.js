a = [];
for(scene_name in scenes){
	a.push("scenes/"+scene_name+"/background.png");
	a.push("scenes/"+scene_name+"/far.png");
	a.push("scenes/"+scene_name+"/mid.png");
	a.push("sprites/"+scene_name+"/idle1.png");
	a.push("sprites/"+scene_name+"/idle2.png");
	a.push("sprites/"+scene_name+"/idle3.png");
	a.push("sprites/"+scene_name+"/left1.png");
	a.push("sprites/"+scene_name+"/left2.png");
	a.push("sprites/"+scene_name+"/left3.png");
	a.push("sprites/"+scene_name+"/left4.png");
	a.push("sprites/"+scene_name+"/left5.png");
	a.push("sprites/"+scene_name+"/right1.png");
	a.push("sprites/"+scene_name+"/right2.png");
	a.push("sprites/"+scene_name+"/right3.png");
	a.push("sprites/"+scene_name+"/right4.png");
	a.push("sprites/"+scene_name+"/right5.png");
}

function loadAssets() {
	loader = new PIXI.AssetLoader(a);
	loader.onComplete = onAssetLoaded
	loader.load();
}