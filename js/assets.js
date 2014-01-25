function loadAssets() {
	loader = new PIXI.AssetLoader(
		[
			"scenes/"+scene+"/background.png",
			"scenes/"+scene+"/far.png",
			"scenes/"+scene+"/mid.png",
			"sprites/"+scene+"/idle1.png",
			"sprites/"+scene+"/idle2.png",
			"sprites/"+scene+"/idle3.png",
			"sprites/"+scene+"/left1.png",
			"sprites/"+scene+"/left2.png",
			"sprites/"+scene+"/left3.png",
			"sprites/"+scene+"/left4.png",
			"sprites/"+scene+"/left5.png",
			"sprites/"+scene+"/right1.png",
			"sprites/"+scene+"/right2.png",
			"sprites/"+scene+"/right3.png",
			"sprites/"+scene+"/right4.png",
			"sprites/"+scene+"/right5.png"
		]
	);
	loader.onComplete = onAssetLoaded
	loader.load();
}