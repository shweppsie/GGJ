assets.push("scripts/dragon/dragonstill1.png");
assets.push("scripts/dragon/dragonstill2.png");
assets.push("scripts/dragon/dragonstill3.png");

function dragon() {
	medieval_music.fade(1.0, 0.0, 250);
	dragon_roar.play();
	dragon_music.stop();
	dragon_music.volume(0.0);
	dragon_music.play();
	dragon_music.fade(0.0, 1.0, 200);

	dragon_frames = [
		"scripts/dragon/dragonstill1.png",
		"scripts/dragon/dragonstill2.png",
		"scripts/dragon/dragonstill3.png"
	]

	bubbletext_index = -1;
	bubbletext = [
		[null, "left", 0, 0, "Oh no. It's the legendary dragon that guards the 'cave of incredible pain and almost certain death'."],
		[null, "left", 0, 0, "Whatever will our hero do..."],
		[null, "right", 200, 120, "Meow..."],
		[null, "right", 200, 120, "Err... I mean... ROOAAAR!"],
		[null, "right", 200, 120, "Who DARES enter my cave!"],
		[null, "left", 200, 120, "It is I, brave Sir Player, I'm here to put an end to your evil reign, and reclaim the city's gold!"],
		[null, "right", 200, 120, "Gah!, You adventurers with your reclaiming and putting ends to. Nobody ever comes in to just *talk* with me... I have feelings too you know!"],
		[null, "left", 200, 120, "I don't care, you foul beast! You are evil and you must die!!!111one"],
		[null, "left", 0, 0, "And with a single swift movement, the player drew his sword and plunged it deep into the dragon's skull. It was the most gory, graphically intense dragon killing scene in the history of video games, that would have rocked the foundations of the art world forever."],
		[null, "left", 0, 0, "Unfortunately the illustrator, so excited with what she had created, had forgotten to eat and promptly died before saving the files. So for all intents and purposes, the dragon simply..."],
		[function(){stage.removeChild(dragonbro)}, "left", 0, 0, "Unfortunately the illustrator, so excited with what she had created, had forgotten to eat and promptly died before saving the files. So for all intents and purposes, the dragon simply... disappeared."],
		[null, "left", 0, 0, "I wish you could have seen it though... Seriously, wow. Anyway, ON WITH THE SHOW!"],	
	];

	right_enabled = false;

	dragon_frame = 0;
	dragonbro = new PIXI.Sprite.fromImage(dragon_frames[dragon_frame]);
	dragonbro.position.x = 310;
	dragonbro.position.y = 380;
	dragonbro.scale.y = 0.8;
	dragonbro.scale.x = 0.8;
	stage.addChild(dragonbro);
	update_dragon();

	bubble = new PIXI.Sprite.fromImage("graphics/bubbleleft.png");
	bubble.scale.y = 0.5;
	bubble.scale.x = 1;
	bubble.interactive = true;
	bubble_run();

	text = new PIXI.Text("", {font:"16pt Arial", fill:"black", wordWrap:"true", wordWrapWidth:500});

	function update_dragon(){
		dragon_frame += 1;
		if(dragon_frame >= dragon_frames.length){
			dragon_frame = 0;
		}
		dragonbro.setTexture(PIXI.Texture.fromImage(dragon_frames[dragon_frame]));
		setTimeout(update_dragon, 200)
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
			medieval_music.fade(0.0, 1.0, 1000);
			dragon_music.fade(1.0, 0.0, 500);
			right_enabled = true;
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


