// Globals
var CANVAS_WIDTH = document.getElementById("game-canvas").width;
var CANVAS_HEIGHT = document.getElementById("game-canvas").height;

var speed = 0;
var acceleration = 3;

var mouseX;
var mouseY;
var mouse_down = false;
var key_down = false;
var key_direction;

var sprite_animation_counter = 0;
var sprite_animation_speed = 10; // lower = faster animation (don't judge me)
var player;
var playerX = CANVAS_WIDTH/2;
var playerY = CANVAS_HEIGHT-220;
var current_player_frame = 0;

var scene_names = [
	'medieval',
	'grass',
	'daycity',
	'nightcity',
]
var scenes = {
	medieval : { end : 500, scene : null, sprites: {} },
	grass : { end : 1000, scene : null, sprites: {} },
	daycity : { end : 1500, scene : null, sprites: {} },
	nightcity : { end : 2000, scene : null, sprites: {} },
};

var scene_current = 'medieval';
var scene_next = "grass";
var scene_next_next = "grass";

for(scene_name in scenes){
	s = scenes[scene_name];
	s['sprites']['player_idle_frames'] = ["sprites/"+scene_name+"/idle1.png", "sprites/"+scene_name+"/idle2.png", "sprites/"+scene_name+"/idle3.png"];
	s['sprites']['player_left_frames'] = ["sprites/"+scene_name+"/left1.png", "sprites/"+scene_name+"/left2.png", "sprites/"+scene_name+"/left3.png", "sprites/"+scene_name+"/left4.png", "sprites/"+scene_name+"/left5.png"];
	s['sprites']['player_right_frames'] = ["sprites/"+scene_name+"/right1.png", "sprites/"+scene_name+"/right2.png", "sprites/"+scene_name+"/right3.png", "sprites/"+scene_name+"/right4.png", "sprites/"+scene_name+"/right5.png"];
	console.log(s['sprites']);
}

var frame_count = 0;