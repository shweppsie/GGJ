document.oncontextmenu = function() { return false; };
document.onselectstart = function() { return false; };

function init(){
	stage = new PIXI.Stage(0x000000);
	renderer = PIXI.autoDetectRenderer(
		CANVAS_WIDTH,
		CANVAS_HEIGHT,
		document.getElementById("game-canvas")
	);

	loadingBar_size = 70;
	bar_empty = PIXI.Texture.fromImage("graphics/load_back.png");
	bar_full = PIXI.Texture.fromImage("graphics/load_fill.png");
	cur_bar_x = CANVAS_WIDTH/2-(16*loadingBar_size/2);
	cur_fill_x = cur_bar_x;
	bar_y = (CANVAS_HEIGHT/2)-8;
	
	for (var j=0; j<loadingBar_size; j++) {
        var bar = new PIXI.Sprite(bar_empty);
        bar.position.x = cur_bar_x;
        bar.position.y = bar_y;
        cur_bar_x += 16;
		stage.addChild(bar);
    }
	requestAnimFrame(update);
	
	loadAssets();
	loadSound();
	
	
	// Mouse support
	$(renderer.view).mousedown(function(e) {
		var parentOffset = $(this).offset();
		mouseX = e.pageX - parentOffset.left;
		mouseY = e.pageY - parentOffset.top;
		current_player_frame = 0;
		mouse_down = true;
	});
	$(renderer.view).mouseup(function(e) {
		current_player_frame = 0;
		mouse_down = false;
	});
	$(renderer.view).mouseout(function(e) {
		current_player_frame = 0;
		mouse_down = false;
	});
	$(renderer.view).mousemove(function(e) {
		var parentOffset = $(this).offset();
		mouseX = e.pageX - parentOffset.left;
		mouseY = e.pageY - parentOffset.top;
		//TODO handle crossover
	});
	
	// Touch support
	$(renderer.view).on({ 'touchstart' : function() {
		mouse_down = true;
	}});
	$(renderer.view).on({ 'touchend' : function() {
		mouse_down = false;
	}});
	$(renderer.view).on({ 'touchmove' : function() {
		mouse_down = false;
	}});
	
	// Keyboard support
	$(document).keydown(function(e) {
		// Left
		if (e.which == 37 || e.which == 65) {
			key_down = true;
			key_direction = 0;
		}
		// Right
		else if (e.which == 39 || e.which == 68) {
			key_down = true;
			key_direction = 1;
		}
	});
	$(document).keyup(function(e) {
		if (e.which == 37 || e.which == 65 || e.which == 39 || e.which == 68) {
			key_down = false;
		}
	});
}

function loadProgress() {
	loadBar(1);
}

function loadBar(n) {
	n = Math.round(n);
    for (var k = 0; k < n; k++) {
		var fill = new PIXI.Sprite(bar_full);
		fill.position.x = cur_fill_x;
		fill.position.y = bar_y;

		stage.addChild(fill);
		cur_fill_x += 16;
    }
}

function createScene(scene_name) {
	backgroundTexture = PIXI.Texture.fromImage(
		"scenes/"+scene_name+"/background.png"
		);
	background = new PIXI.TilingSprite(
		backgroundTexture,
		renderer.width,
		renderer.height
		);
	if(scene_name == scenes[scene_current].name){
		background.position.x = 0;
	}else{
		background.position.x = renderer.width;
	}
	background.position.y = 0;
	background.tilePosition.x = 0;
	background.tilePosition.y = 0;
	background.alpha = 0;
	stage.addChild(background);
	fadeIn(background, 0.05);
	
	farTexture = PIXI.Texture.fromImage(
		"scenes/"+scene_name+"/far.png"
		);
	far = new PIXI.TilingSprite(
		farTexture,
		renderer.width,
		1200
		);
	if(scene_name == scenes[scene_current].name){
		far.position.x = 0;
	}else{
		far.position.x = renderer.width;
	}
	far.position.y = 0;
	far.tilePosition.x = 0;
	far.tilePosition.y = 0;
	far.alpha = 0;
	stage.addChild(far);
	fadeIn(far, 0.05);

	midTexture = PIXI.Texture.fromImage(
		"scenes/"+scene_name+"/mid.png"
		);
	mid = new PIXI.TilingSprite(
		midTexture,
		renderer.width,
		renderer.height
	);
	if(scene_name == scenes[scene_current].name){
		mid.position.x = 0;
	} else{
		mid.position.x = renderer.width;
	}
	mid.position.y = 128;
	mid.tilePosition.x = 0;
	mid.tilePosition.y = 0;
	mid.alpha = 0;
	stage.addChild(mid);
	fadeIn(mid, 0.05);

	return [background, far, mid];
}

function clearStage() {
	var childLen = stage.children.length;
	for (var i=0; i<childLen; i++) {
		stage.removeChild(stage.children[0]);
	}
}

function fadeIn(object, rate) {
	if (object.alpha < 1.0) {
		object.alpha += rate;
		setTimeout(function() {
			fadeIn(object, rate);
		}, 20);
		return;
	}
}

function fadeOut(object, rate) {
	if (object.alpha > 0.0) {
		object.alpha -= rate;
		setTimeout(function() {
			fadeOut(object, rate);
		}, 20);
		return;
	}
}

function splashScreen() {
	clearStage();
	
	jazz_music.volume(0.0);
	jazz_music.play();
	jazz_music.fade(0.0, 1.0, 1000);
	
	title_screen = PIXI.Sprite.fromImage("graphics/titleScreen.png");
	title_screen.width = CANVAS_WIDTH;
	title_screen.height = CANVAS_HEIGHT;
	title_screen.alpha = 0;
	stage.addChild(title_screen);
	fadeIn(title_screen, 0.1);
	
	jazz_button = PIXI.Sprite.fromImage("graphics/jazzButton.png");
	jazz_button.position.x = 500;
	jazz_button.position.y = 500;
	jazz_button.interactive = true;
	jazz_button.alpha = 0;
	stage.addChild(jazz_button);
	jazz_button.click = function() {
		story_button.interactive = false;
		jazz_button.interactive = false;
		fadeOut(story_button, 0.01);
		fadeOut(jazz_button, 0.01);
		fadeOut(title_screen, 0.01);
		setTimeout(startJazzMode, 3000);
	};
	fadeIn(jazz_button, 0.1);
	
	story_button = PIXI.Sprite.fromImage("graphics/storyButton.png");
	story_button.position.x = 500;
	story_button.position.y = 300;
	story_button.interactive = true;
	story_button.alpha = 0;
	stage.addChild(story_button);
	story_button.click = function() {
		story_button.interactive = false;
		jazz_button.interactive = false;
		fadeOut(story_button, 0.01);
		fadeOut(jazz_button, 0.01);
		fadeOut(title_screen, 0.01);
		setTimeout(characterCreation, 3000);
	};
	fadeIn(story_button, 0.1);
}


function characterCreation() {
	stage.removeChild(story_button);
	stage.removeChild(jazz_button);
	stage.removeChild(title_screen);
	
	var ballval = [];
	ballval.push(123);
	var points = 20;
	
	// text
	var pointsLeft = new PIXI.Text("Points remaining: "+points, {font:"Bold 16pt Arial", fill:"white"})
    var warning = new PIXI.Text("Note: Choose your skills wisely. Your life will depend on it!", {font:"Bold 13pt Arial", fill:"white"})
    var str = new PIXI.Text("Strength", {font:"13pt Arial", fill:"white"});
    var agi = new PIXI.Text("Agility", {font:"13pt Arial", fill:"white"});
    var vit = new PIXI.Text("Vitality", {font:"13pt Arial", fill:"white"});
    var dex = new PIXI.Text("Dexterity", {font:"13pt Arial", fill:"white"});
    var vis = new PIXI.Text("Vision", {font:"13pt Arial", fill:"white"});
    var ref = new PIXI.Text("Reflex", {font:"13pt Arial", fill:"white"});
	
	// text locations
	pointsLeft.position.x = 20;
    pointsLeft.position.y = 40;
    warning.position.x = 20;
    warning.position.y = 410;
    str.position.x = 20;
    str.position.y = 155;
    agi.position.x = 20;
    agi.position.y = 195;
    vit.position.x = 20;
    vit.position.y = 235;
    dex.position.x = 20;
    dex.position.y = 275;
    vis.position.x = 20;
    vis.position.y = 315;
    ref.position.x = 20;
    ref.position.y = 355;
	
	//textures
	var texture = PIXI.Texture.fromImage("graphics/left.png");
    var texturedown = PIXI.Texture.fromImage("graphics/leftdown.png");
    var textureover = PIXI.Texture.fromImage("graphics/leftover.png");
    var texture2 = PIXI.Texture.fromImage("graphics/right.png");
    var texture2down = PIXI.Texture.fromImage("graphics/rightdown.png");
    var texture2over = PIXI.Texture.fromImage("graphics/rightover.png");
    var confirm= PIXI.Texture.fromImage("graphics/confirm.png");
    var confirmDown= PIXI.Texture.fromImage("graphics/confirmdown.png");
    var confirmOver= PIXI.Texture.fromImage("graphics/confirmover.png");
    var texture3 = PIXI.Texture.fromImage("graphics/bar.png");
    var texture4 = PIXI.Texture.fromImage("graphics/ball.png");
	
	var button = new PIXI.Sprite(confirm);
    button.interactive = true;

    button.mousedown = button.touchstart = function(data){

        this.isdown = true;
        this.setTexture(confirmDown);
        this.alpha = 1;
        
    }
    // set the mouseup and touchend callback..
    button.mouseup = button.touchend = button.mouseupoutside = button.touchendoutside = function(data){
        this.isdown = false;

        if(this.isOver)
        {
            this.setTexture(confirmOver);
        }
        else
        {
            this.setTexture(confirm);
        }
    }
    // set the mouseover callback..
    button.mouseover = function(data){

        this.isOver = true;

        if(this.isdown)return

        this.setTexture(confirmOver);
    }

    // set the mouseout callback..
    button.mouseout = function(data){

        this.isOver = false;
        if(this.isdown)return
        this.setTexture(confirm)
    }

    button.click = function(data){
		var childLen = stage.children.length;
		for (var m = 0; m < stage.children.length; m++) {
			fadeOut(stage.children[m], 0.1);
		}
		setTimeout(startGame, 1000);
    }

    button.position.x = 50;
    button.position.y = 500;

    stage.addChild(button);


    var xbar = 132;
    var ybar = 150;
    for (var i=0; i < 6; i++)
    {
        for (var j=0; j < 3; j++)
        {
            var bar = new PIXI.Sprite(texture3);
            bar.position.x = xbar;
            bar.position.y = ybar;
            stage.addChild(bar);
            xbar += 31;
        }
        xbar -= 93;
        ybar += 40;
    }


    var balls = [];
    var yb = 151;
    //create balls
    for (var i=0; i < 6; i++)
    {   
        var ball = new PIXI.Sprite(texture4);
        ball.position.x = 123;
        ball.position.y = yb;
        yb += 40;
        stage.addChild(ball);

        balls.push(ball);
    }


    //create slider buttons
    var x = 99;
    var y = 150;
    var lefts = [];
    var rights = [];
    for (var i = 0; i < 6; i++) 
    {   
        
        ballval.push(123);

        var left = new PIXI.Sprite(texture);
        left.interactive = true;
        var right = new PIXI.Sprite(texture2);
        right.interactive = true;

        left.position.x = x;
        left.position.y = y;

        x += 127;

        right.position.x = x;
        right.position.y = y;


        //add interactivity to buttons
        // set the mousedown and touchstart callback..
        left.mousedown = left.touchstart = function(data){

            this.isdown = true;
            this.setTexture(texturedown);
            this.alpha = 1;
            
        }
        // set the mouseup and touchend callback..
        left.mouseup = left.touchend = left.mouseupoutside = left.touchendoutside = function(data){
            this.isdown = false;

            if(this.isOver)
            {
                this.setTexture(textureover);
            }
            else
            {
                this.setTexture(texture);
            }
        }
        // set the mouseover callback..
        left.mouseover = function(data){

            this.isOver = true;

            if(this.isdown)return

            this.setTexture(textureover);
        }

        // set the mouseout callback..
        left.mouseout = function(data){

            this.isOver = false;
            if(this.isdown)return
            this.setTexture(texture)
        }

        left.click = function(data){
            var indexl = lefts.indexOf(this)
            if(ballval[indexl] > 123 && ballval[indexl] <= 203 && points < 20){
                    ballval[indexl] -= 5;
                    balls[indexl].position.x = ballval[indexl];
                    points += 1;
                    pointsLeft.setText("Points remaining: "+points);
                    
            }
        }

        // set the mousedown and touchstart callback..
        right.mousedown = right.touchstart = function(data){

            this.isdown = true;
            this.setTexture(texture2down);
            this.alpha = 1;
            
        }
        // set the mouseup and touchend callback..
        right.mouseup = right.touchend = right.mouseupoutside = right.touchendoutside = function(data){
            this.isdown = false;

            if(this.isOver)
            {
                this.setTexture(texture2over);
            }
            else
            {
                this.setTexture(texture2);
                
            }
        }
        // set the mouseover callback..
        right.mouseover = function(data){

            this.isOver = true;

            if(this.isdown)return

            this.setTexture(texture2over)
        }

        // set the mouseout callback..
        right.mouseout = function(data){

            this.isOver = false;
            if(this.isdown)return
            this.setTexture(texture2)
        }
        right.click = function(data){
            var indexr = rights.indexOf(this)
            if(ballval[indexr] >= 123 && ballval[indexr] < 203 && points > 0){
                    ballval[indexr] += 5;
                    balls[indexr].position.x = ballval[indexr];
                    points -= 1;
                    pointsLeft.setText("Points remaining: "+points);
            }
        }

        stage.addChild(left);
        stage.addChild(right);

        lefts.push(left);
        rights.push(right);

        y += 40;
        x = 99;
    }
 
    //add to stage 
    stage.addChild(pointsLeft);
    stage.addChild(warning);
    stage.addChild(str);
    stage.addChild(agi);
    stage.addChild(vit);
    stage.addChild(dex);
    stage.addChild(vis);
    stage.addChild(ref);
}

function startGame() {
	clearStage();
	jazz_music.fade(1.0, 0.0, 2000);
	medieval_music.volume(0.0);
	medieval_music.play();
	medieval_music.fade(0.0, 1.0, 4000);
	
	footstep_type = 0;
	frame_count = 0;
	scene_current = 0;
	in_game = true;
	right_enabled = true;

	// Reload start moke music because annoying bug.
	mokebattle_music_start = new Howl({
	urls: ['audio/music/mokebattle_start.mp3'],
		volume: 2.0,
		loop: false,
		onend: function() {
			mokebattle_music_loop.play();
		}
	});
	
	// load the scenes
	for(i=0;i<scenes.length;i++){
		scenes[i]["scene"] = createScene(scenes[i].name);
	}
	
	for(i=0;i<arbitrary_objects.length;i++){
		arbitrary_objects[i].sprite = addArbitraryObject(arbitrary_objects[i]);
	}

	addPlayer(playerX, playerY);
}

function startJazzMode() {
	stage.removeChild(story_button);
	stage.removeChild(jazz_button);
	stage.removeChild(title_screen);
	
	in_game = true;
	right_enabled = true;
	left_enabled = true;
	jazzMode = true;
	frame_count = 0;
	footstep_type = 1;
	scene_current = 3;
	scenes[scene_current]["scene"] = createScene(scenes[scene_current].name);
	
	addPlayer(playerX*2, playerY);
}

function addPlayer(x,y) {
	player = PIXI.Sprite.fromImage(player_idle_frames[current_player_frame]);
	player.anchor.x = 0.5;
	player.anchor.y = 0.5;
	player.position.x = x;
	player.position.y = y;
	player.scale.x = 0.5;
	player.scale.y = 0.5;
	player.alpha = 0;
	stage.addChild(player);
	fadeIn(player, 0.05);
}

function addArbitraryObject(src_obj) {
	obj = PIXI.Sprite.fromImage(src_obj.path);
	obj.anchor.x = 0;
	obj.anchor.y = 0.5;
	obj.scale.y = src_obj.scale_y;
	obj.position.x = renderer.width;
	obj.position.y = renderer.height/2 + src_obj.rel_y;
	obj.alpha = 0;
	stage.addChild(obj);
	fadeIn(obj, 0.1);
	return obj;
}

function update() {
	if (in_game) {
		if (mouse_down || key_down) {

			/* get the mouse pointer location */
			if (!jazzMode) {
				mouse_location = mouseX < (CANVAS_WIDTH/4) ? 0 : 1;
			} else {
				mouse_location = mouseX < (CANVAS_WIDTH/2) ? 0 : 1;
			}

			// Move player left
			if ((mouse_down && mouse_location == 0) || (key_down && key_direction == 0)) {
				if(!left_enabled){
					mouse_down = false;
					key_down = false;
				} else {
					if (!footsteps) {
						footsteps = true;
						if (footstep_type == 0) {
							footsteps_grass.play();
						}
						else {
							footsteps_tile.play();
						}
					}
					speed = -acceleration;
					if (sprite_animation_counter % sprite_animation_speed == 0) {
						sprite_animation_counter = 0;
						if (current_player_frame < (player_left_frames.length-1)) {
							current_player_frame += 1;
						}
						else {
							current_player_frame = 0;
						}
						player.setTexture(PIXI.Texture.fromImage(player_left_frames[current_player_frame]));
					}
					if(frame_count > scenes[scene_current].start - renderer.width){
						frame_count -= 1;
					}
				}
			}
			// Move player right
			else if ((mouse_down && mouse_location == 1) || (key_down && key_direction == 1)) {
				if(!right_enabled){
					mouse_down = false;
					key_down = false;
				} else {
					if (!footsteps) {
						footsteps = true;
						if (footstep_type == 0) {
							footsteps_grass.play();
						}
						else {
							footsteps_tile.play();
						}
					}
					speed = acceleration;
					if (sprite_animation_counter % sprite_animation_speed == 0) {
						sprite_animation_counter = 0;
						if (current_player_frame < (player_right_frames.length-1)) {
							current_player_frame += 1;
						}
						else {
							current_player_frame = 0;
						}
						player.setTexture(PIXI.Texture.fromImage(player_right_frames[current_player_frame]));
					}
					frame_count += 1;
				}
			}
			if (!jazzMode) {
				for(i=0;i<scripts.length;i++){
					if(frame_count == scripts[i].start){
						frame_count += 1;
						window[scripts[i]['name']]();
					}
				}
			}
		}
		else {
			if (footsteps) {
				footsteps = false;
				footsteps_grass.stop();
				footsteps_tile.stop();
			}
			speed = 0;
			if (sprite_animation_counter % sprite_animation_speed == 0) {
				sprite_animation_counter = 0;
				if (current_player_frame < (player_idle_frames.length-1)) {
					current_player_frame += 1;
				}
				else {
					current_player_frame = 0;
				}
				player.setTexture(PIXI.Texture.fromImage(player_idle_frames[current_player_frame]));
			}
		}

		sprite_animation_counter += 1;

		/* render any arbitrary objects */
		if (!jazzMode) {
			for (i=0;i<arbitrary_objects.length;i++){
				if(frame_count > arbitrary_objects[i].start){
					arbitrary_objects[i].sprite.position.x -= speed * 3;
				}
			}
		}

		if (!jazzMode && (scenes[scene_current]['scene'][2].position.x <= (-renderer.width) + speed * 4)){

			/* scene transition code */
			if(scene_current < scenes.length){
				scene_current += 1;
				if (scene_current == 2) {
					footsteps_grass.stop();
					footstep_type = 1;
					if (footsteps) {
						footsteps_tile.play();
					}
				}
				scene_music[scene_current-1].fade(1.0, 0.0, 1000);
				scene_music[scene_current].volume(0.0);
				scene_music[scene_current].play();
				scene_music[scene_current].fade(0.0, 1.0, 2000);
			}

			/* line up current scene */
			scenes[scene_current]['scene'][2].position.x = 0;
			scenes[scene_current]['scene'][1].position.x = 0;
			scenes[scene_current]['scene'][0].position.x = 0;

		} else if (!jazzMode &&(frame_count > scenes[scene_current]['end'])){

			/* move old scene off screen */
			scenes[scene_current]['scene'][2].position.x -= speed * 4;
			scenes[scene_current]['scene'][1].position.x -= speed * 4;
			scenes[scene_current]['scene'][0].position.x -= speed * 4;

			/* and new scene in */
			scenes[scene_current+1]['scene'][2].position.x -= speed * 4;
			scenes[scene_current+1]['scene'][1].position.x -= speed * 4;
			scenes[scene_current+1]['scene'][0].position.x -= speed * 4;

		} else if (jazzMode) {
			scenes[scene_current]['scene'][2].tilePosition.x -= speed * 2;
			scenes[scene_current]['scene'][1].tilePosition.x -= speed * 0.4;
		}
		else {

			/* scrolling */
			scenes[scene_current]['scene'][2].tilePosition.x -= speed * 4;
			scenes[scene_current]['scene'][1].tilePosition.x -= speed * 0.8;

		}
	}
	
	renderer.render(stage);
	requestAnimFrame(update);
}

