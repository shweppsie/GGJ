function loadAssets() {
	loader = new PIXI.AssetLoader(
		[
			"scenes/"+scene+"/background.png",
			"scenes/"+scene+"/far.png",
			"scenes/"+scene+"/mid.png",
			"sprites/"+scene+"/dude1.png",
			"sprites/"+scene+"/dude2.png",
			"sprites/"+scene+"/dude3.png",
		]
	);
	loader.onComplete = onAssetLoaded
	loader.load();
}