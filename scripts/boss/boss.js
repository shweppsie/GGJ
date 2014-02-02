assets.push("scripts/boss/kid2.png");
assets.push("scripts/boss/mum3.png");
assets.push("scripts/boss/kid3.png");
assets.push("scripts/boss/house.png");
assets.push("scripts/boss/kid1.png");
assets.push("scripts/boss/mum1.png");
assets.push("scripts/boss/mum2.png");


function boss() {
	medieval_music.stop();
	evil_laugh.play();
	footsteps_tile.stop();

	bubbletext_index = -1;
	bubbletext = [
		[null, "right", 300, 200, "Stop! You there, Player!"],
		[null, "right", 300, 200, "ahem... IT IS I, the invisible EVIL villain, Lord Saltsworth!"],
		[null, "right", 300, 200, "I have spent years perfecting my invisibility device, which explains perfectly why you can't see me, and has absolutely nothing to do with the fact that my creators ran out of time to do my artwork!"],
		[null, "right", 300, 200, "And so... It has come down to this. We always knew it would. You and I. Mano-a-Mano. Yin and Yang, Good... versus Evil."],
		[null, "right", 300, 200, "But... you know what? While I was creating this here invisibility device, I discovered my passion for electrical engineering. So I've put my evil ways behind me, and have enrolled at the local University! I do hope this silly feud between us can come to an end... So as a gesture of goodwill, I present to you my cat: Mr Tibbles."],
		[null, "right", 300, 200, "I'm sad to part with him, but I'm not allowed pets in my new dorm room."],
		[null, "right", 300, 200, "Take care of him... Farewell, brave adventurer!"],
		[null, "left", 0, 0, "Appalled by how anti-climatic the final fight scene was, you dress Mr Tibbles up to look like Lord Saltsworth, and slay him in a way so horrific that the local animal shelter wouldn't let us show you."],
	];

	right_enabled = false;

	bubble = new PIXI.Sprite.fromImage("graphics/bubbleleft.png");
	bubble.scale.y = 0.5;
	bubble.scale.x = 1;
	bubble.interactive = true;
	bubble_run();

	text = new PIXI.Text("", {font:"16pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});

	function bubble_run(){
		if(bubbletext_index == -1){
			bubbletext_index = 0;
			setTimeout(function(){
				stage.addChild(bubble);
				stage.addChild(text);
				bubble_run();
			}, 200);
			return;
		}

		if(bubbletext_index >= bubbletext.length){
			stage.removeChild(bubble);
			stage.removeChild(text);
			//right_enabled = true;
			function fade(){
				if(player.alpha > 0){
					change = 0.01;
					scenes[scene_current]['scene'][0].alpha -= change;
					scenes[scene_current]['scene'][1].alpha -= change;
					scenes[scene_current]['scene'][2].alpha -= change;
					player.alpha -= change;
					console.log("fade");
					setTimeout(fade, 40);
					return;
				}
				homescene();
			}
			daycity_music.fade(1.0, 0.0, 1000);
			nightcity_music.stop();
			nightcity_music.volume(0.0);
			nightcity_music.play();
			nightcity_music.fade(0.0, 1.5, 2000);
			
			fade();
			return;
		}

		if(bubbletext[bubbletext_index][0] != null){
			bubbletext[bubbletext_index][0]();
		}

		bubble.setTexture(PIXI.Texture.fromImage("graphics/bubble"+bubbletext[bubbletext_index][1]+".png"));

		bubble.position.x = bubbletext[bubbletext_index][2];
		bubble.position.y = bubbletext[bubbletext_index][3];

		text.position.x = bubble.position.x + 50;
		text.position.y = bubble.position.y + 50;
		text.setText(bubbletext[bubbletext_index][4]);
		
		bubbletext_index++;
		bubble.mousedown = bubble_run;
	}
}

function homescene(){
	back = new PIXI.TilingSprite(PIXI.Texture.fromImage("scenes/nightcity/background.png"), renderer.width, renderer.height);
	far = new PIXI.TilingSprite(PIXI.Texture.fromImage("scenes/nightcity/far.png"), renderer.width, renderer.height);
	mid = new PIXI.Sprite.fromImage("scripts/boss/house.png");
	back.alpha = 0;
	far.alpha = 0;
	mid.alpha = 0;
	mid.scale.x = 1.1;
	mid.position.x = 0
	mid.position.y = -120;
	stage.addChild(back);
	stage.addChild(far);
	stage.addChild(mid);

	kid_frame = 0;
	kid_frames = [
		"scripts/boss/kid1.png",
		"scripts/boss/kid2.png",
		"scripts/boss/kid3.png"
	]

	mum_frame = 0;
	mum_frames = [
		"scripts/boss/mum1.png",
		"scripts/boss/mum2.png",
		"scripts/boss/mum3.png"
	]

	bubbletext_index = -1;
	bubbletext = [
		[null, "right", 0, 180, "Oh my God! Here he is!"],
		[null, "right", 0, 180, "Player! Oh Player! I've been worried sick about you!"],
		[null, "right", 0, 180, "Come here young man! I let you out of my sight for ONE second and you wander off! Where have you been? It's been FOUR HOURS! I had to call the Police!"],
		[null, "right", 0, 180, "Is that... Blood on your hands?"],
	];

	right_enabled = false;

	kid_frame = 0;
	kidbro = new PIXI.Sprite.fromImage(kid_frames[kid_frame]);
	kidbro.alpha = 0;
	kidbro.position.x = 100;
	kidbro.position.y = 525;
	kidbro.scale.y = 0.5;
	kidbro.scale.x = 0.5;
	stage.addChild(kidbro);
	update_kid();

	mum_frame = 0;
	mumbro = new PIXI.Sprite.fromImage(mum_frames[mum_frame]);
	mumbro.alpha = 0;
	mumbro.position.x = 500;
	mumbro.position.y = 420;
	mumbro.scale.y = 0.8;
	mumbro.scale.x = 0.8;
	stage.addChild(mumbro);
	update_mum();
	
	fadeIn(kidbro, 0.1);
	fadeIn(mumbro, 0.1);
	fadeIn(mid, 0.1);
	fadeIn(far, 0.1);
	fadeIn(back, 0.1);

	bubble = new PIXI.Sprite.fromImage("graphics/bubbleleft.png");
	bubble.scale.y = 0.5;
	bubble.scale.x = 1;
	bubble.interactive = true;
	bubble_run();

	text = new PIXI.Text("", {font:"16pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});

	function update_kid(){
		kid_frame += 1;
		if(kid_frame >= kid_frames.length){
			kid_frame = 0;
		}
		kidbro.setTexture(PIXI.Texture.fromImage(kid_frames[kid_frame]));
		setTimeout(update_kid, 200)
	}

	function update_mum(){
		mum_frame += 1;
		if(mum_frame >= mum_frames.length){
			mum_frame = 0;
		}
		mumbro.setTexture(PIXI.Texture.fromImage(mum_frames[mum_frame]));
		setTimeout(update_mum, 200)
	}

	function bubble_run(){
		if(bubbletext_index == -1){
			bubbletext_index = 0;
			setTimeout(function(){
				stage.addChild(bubble);
				stage.addChild(text);
				bubble_run();
			}, 200);
			return;
		}

		if(bubbletext_index >= bubbletext.length){
			stage.removeChild(bubble);
			stage.removeChild(text);
			stage.removeChild(mumbro);
			stage.removeChild(kidbro);
			
			fadeOut(scenes[scene_current]['scene'][2], 0.05);
			fadeOut(scenes[scene_current]['scene'][1], 0.05);
			fadeOut(scenes[scene_current]['scene'][0], 0.05);
			scenes[3]['scene'][2].alpha = 0;
			scenes[3]['scene'][1].alpha = 0;
			scenes[3]['scene'][0].alpha = 0;
			scenes[3]['scene'][2].position.x = 0;
			scenes[3]['scene'][1].position.x = 0;
			scenes[3]['scene'][0].position.x = 0;
			fadeIn(scenes[3]['scene'][2], 0.02);
			fadeIn(scenes[3]['scene'][1], 0.02);
			fadeIn(scenes[3]['scene'][0], 0.02);

			stage.removeChild(back);
			stage.removeChild(far);
			stage.removeChild(mid);

			creditsOn = true;
			function b() {
				if (creditsOn) {
					scenes[3]['scene'][1].tilePosition.x += 0.5;	
					scenes[3]['scene'][2].tilePosition.x += 4;	
					setTimeout(b, 20);
				}
			}

			b();
			setTimeout( function() {
				credits();
			}, 8000);

			return;
		}

		if(bubbletext[bubbletext_index][0] != null){
			bubbletext[bubbletext_index][0]();
		}

		bubble.setTexture(PIXI.Texture.fromImage("graphics/bubble"+bubbletext[bubbletext_index][1]+".png"));

		bubble.position.x = bubbletext[bubbletext_index][2];
		bubble.position.y = bubbletext[bubbletext_index][3];

		text.position.x = bubble.position.x + 50;
		text.position.y = bubble.position.y + 50;
		text.setText(bubbletext[bubbletext_index][4]);
		
		bubbletext_index++;
		bubble.mousedown = bubble_run;
	}	
}

function credits() {
	screen_text = [];
	credit_text = [
		[6, "The End"],
		[3, ""],
		[3, ""],
		[3, ""],
		[3, "Created in 48 hours for:"],
		[2, "Global Game Jam 2014, University of Waikato"],
		[3, ""],
		[3, "Programmers:"],
		[2, "Jeremy Utting, Nathan Overall, Jaco vdm, Ruan vdm"],
		[3, ""],
		[3, "Art by:"],
		[2, "Lise van Zijl"],
		[3, ""],
		[3, "Llamas trained by:"],
		[2, "Gay-ry van Zijl"],
		[3, ""],
		[3, "Created using:"],
		[2, "Pixi.js, Howler.js, Adobe Illustrator, Audacity"],
		[3, ""],
		[3, "Music:"],
		[2, "Licensed under Creative Commons: By Attribution 3.0"],
		[2, "http://creativecommons.org/licensesby/3.0/"],
		[2, "Call to Adventure - Kevin MacLeod (incompetech.com)"],
		[2, "Hitman - Kevin MacLeod (incompetech.com)"],
		[2, "Full On - Kevin MacLeod (incompetech.com)"],
		[2, "Gymnopedie No. 1 - Kevin MacLeod (incompetech.com)"],
		[2, "Take a Chance - Kevin MacLeod (incompetech.com)"],
		[2, "Detective Jazz - Track composed and recorded by Mihai Sorohan 2009"],
		[3, ""],
		[2, "Special thanks to Stephen Brown for the 'Mokemon' Theme"],
		[3, ""],
		[3, "Sound effects from freesound.org:"],
		[2, "dragon roar - joelaudio"],
		[2, "grass footsteps - kmoon"],
		[2, "tile footsteps - mentalsanity"],
		[3, ""],
		[3, ""],
		[3, ""],
		[5, "Thanks for playing our game, we hope you enjoyed it :]"]
	];
	function newLine(line) {
		if (line < credit_text.length) {
			var ctext = new PIXI.Text(credit_text[line][1], {font:"bold 16pt Arial", fill:"white", strokeThickness:credit_text[line][0], wordWrap:"false", wordWrapWidth:800});
			ctext.position.x = 150;
			ctext.position.y = 800;
			stage.addChild(ctext);
			screen_text.push(ctext);			
			setTimeout(function() {
				newLine(line+1);
			}, 1000);
		}
	}
	function moveCredits() {
		if (creditsOn) {
			if (screen_text.length == 0) {
				creditsOn = false;
			}
			else if (screen_text[0].position.y < -50) {
				screen_text.shift();
			}
			for (var i=0; i<screen_text.length; i++) {
				screen_text[i].position.y -= 2;
			}
			setTimeout(moveCredits, 50);
		}
		else {
			nightcity_music.fade(1.5, 0.0, 3000);
			fadeOut(scenes[3]['scene'][2], 0.02);
			fadeOut(scenes[3]['scene'][1], 0.02);
			fadeOut(scenes[3]['scene'][0], 0.02);
			setTimeout(splashScreen, 2000);
		}
	}
		
	newLine(0);
	moveCredits();
}
