// Globals

/* canvas variables */
var CANVAS_WIDTH = document.getElementById("game-canvas").width;
var CANVAS_HEIGHT = document.getElementById("game-canvas").height;

/* scene variables */
var speed = 0;
var acceleration = 3;
var left_enabled = false;
var right_enabled = false;
var footsteps = false;
var footstep_type = 0;
var in_game = false;
var jazzMode = false;

/* input variables */
var mouseX;
var mouseY;
var mouse_down = false;
var key_down = false;
var key_direction;

/* player variables */
var sprite_animation_counter = 0;
var sprite_animation_speed = 10; // lower = faster animation (don't judge me)
var player;
var playerX = CANVAS_WIDTH/4;
var playerY = CANVAS_HEIGHT-140;
var current_player_frame = 0;

/* our obscure unit of measurment - don't try to understand it */
var frame_count = 0;

/* index current scene */
var scene_current = 0;

/* initialise scene objects */
var scenes = [
	{ name : 'medieval', start : 0, end : 500, scene : null, sprites: {} },
	{ name : 'grass', start : 500, end : 1500, scene : null, sprites: {} },
	{ name : 'daycity', start : 1500, end : 2250, scene : null, sprites: {} },
	{ name : 'nightcity', start : 2250, end : 2500, scene : null, sprites: {} },
];

var scene_music = [];

/* load sprites for each scene */
var scene_name = scenes[scene_current]['name'];
player_idle_frames = ["graphics/idle1.png", "graphics/idle2.png", "graphics/idle3.png"];
player_left_frames = ["graphics/left1.png", "graphics/left2.png", "graphics/left3.png", "graphics/left4.png", "graphics/left5.png"];
player_right_frames = ["graphics/right1.png", "graphics/right2.png", "graphics/right3.png", "graphics/right4.png", "graphics/right5.png"];

/* abitrary objects to render at points on the map */
var arbitrary_objects = [
	{start : 350, path : 'graphics/cave.png', sprite : null, rel_y : 100, scale_y : 1.5 },
	{start : 1400, path : 'graphics/room.png', sprite : null, rel_y : 1, scale_y : 1 },
];

/* define scripts */
var scripts = [
	{ start : 500, name : "dragon" },
	{ start : 1300, name : "mokemon" },
	{ start : 2000, name : "boss" },
	/* this is rigged */
	//{ start : 1, script :  homescene },
]

/* load scripts */
for(i=0;i<scripts.length;i++){
	console.log("js/scenes/"+scripts[i]['name']+".js");
	var s = document.createElement('script')
	s.setAttribute("type","text/javascript")
	var name = scripts[i]['name'];
	s.setAttribute("src", "scripts/"+name+'/'+name+".js")
	document.getElementsByTagName('body')[0].appendChild(s);
}

