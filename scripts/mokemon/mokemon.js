assets.push("scripts/mokemon/mokemon.png");
assets.push("scripts/mokemon/mudkat.png");
assets.push("scripts/mokemon/dude.png");

function mokemon() {
	grass_music.fade(1.0, 0.0, 500);
	mokebattle_music_start.stop();
	mokebattle_music_loop.stop();
	mokebattle_music_loop.volume(2.0);
	mokebattle_music_start.volume(2.0);
	mokebattle_music_start.play();

	bubbletext_index = -1;
	bubbletext = [
		[null, "left", 0, 0, "Oh no. It's the legendary dragon that guards the 'cave of incredible pain and probably death'TM."],
	];

	right_enabled = false;

	back = new PIXI.Sprite.fromImage('scripts/mokemon/mokemon.png');
	back.position.x = 20;
	back.position.y = 20;
	stage.addChild(back);

	p1 = new PIXI.Sprite.fromImage('scripts/mokemon/mudkat.png');
	p1.position.x = 650;
	p1.position.y = 20;
	stage.addChild(p1);

	p2 = new PIXI.Sprite.fromImage('scripts/mokemon/dude.png');
	p2.position.x = 150;
	p2.position.y = 240;
	stage.addChild(p2);

	text1 = new PIXI.Text("Kill", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
	text1.position.x = 680;
	text1.position.y = 560;
	text1.interactive = true;
	text2 = new PIXI.Text("Catch", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
	text2.position.x = 800;
	text2.position.y = 560;
	text2.interactive = true;
	text3 = new PIXI.Text("Cute", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
	text3.position.x = 680;
	text3.position.y = 630;
	text3.interactive = true;
	text4 = new PIXI.Text("Run", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
	text4.position.x = 800;
	text4.position.y = 630;
	text4.interactive = true;

	part2 = function() {
		stage.removeChild(text1);
		stage.removeChild(text2);
		stage.removeChild(text3);
		stage.removeChild(text4);
		stage.removeChild(sucks);
		
		text1 = new PIXI.Text("Yes", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
		text1.position.x = 700;
		text1.position.y = 560;
		text1.interactive = true;
		text2 = new PIXI.Text("No", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
		text2.position.x = 700;
		text2.position.y = 630;
		text2.interactive = true;
		sucks = new PIXI.Text("You selected kill, are you sure? Look how cute it is!", {font:"32pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
		sucks.position.x = 100;
		sucks.position.y = 550;

		text1.mousedown = part3;
		text2.mousedown = part3;

		stage.addChild(text1);
		stage.addChild(text2);
		stage.addChild(sucks);
	}

	part3 = function() {
		text1.mousedown = null;
		text2.mousedown = null;
		bubble = new PIXI.Sprite.fromImage("graphics/bubbleleft.png");
		bubble.scale.y = 0.5;
		bubble.scale.x = 1;
		bubble.interactive = true;
		text = new PIXI.Text("You animal. With speed like a viper, the player dashed towards the Mudkat, and within seconds had torn it limb from limb. Relishing in the knowledge that the world was now safe from this monstrously adorable creature, our brave hero continues on his journey...", {font:"16pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
		
		bubble.position.x = 0;
		bubble.position.y = 0;

		text.position.x = bubble.position.x + 50;
		text.position.y = bubble.position.y + 50;

		stage.addChild(text1);
		stage.addChild(text2);
		stage.addChild(bubble);
		stage.addChild(text);

		bubble.click = function(){
			stage.removeChild(sucks);
			stage.removeChild(back);
			stage.removeChild(bubble);
			stage.removeChild(text);
			stage.removeChild(p1);
			stage.removeChild(p2);
			stage.removeChild(text1);
			stage.removeChild(text2);

			mokebattle_music_start.fade(2.0, 0.0, 500);
			mokebattle_music_loop.fade(2.0, 0.0, 500);
			grass_music.fade(0.0, 1.0, 1000);
			right_enabled = true;
		}
	}

	text1.mousedown = part2;
	text2.mousedown = part2;
	text3.mousedown = part2;
	text4.mousedown = part2;

	stage.addChild(text1);
	stage.addChild(text2);
	stage.addChild(text3);
	stage.addChild(text4);

	sucks = new PIXI.Text("What do?", {font:"48pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});
	sucks.position.x = 100;
	sucks.position.y = 550;
	stage.addChild(sucks);
}


