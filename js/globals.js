// Globals
var CANVAS_WIDTH = document.getElementById("game-canvas").width;
var CANVAS_HEIGHT = document.getElementById("game-canvas").height;

var speed = 0;
var scene = 'city';

var mouseX;
var mouseY;
var mouse_down = false;
var key_down = false;
var key_direction;

var sprite_animation_counter = 0;
var sprite_animation_speed = 10; // lower = faster animation (don't judge me)
var player;
var playerX = CANVAS_WIDTH/2;
var playerY = CANVAS_HEIGHT-140;
var player_idle_frames = ["sprites/"+scene+"/idle1.png", "sprites/"+scene+"/idle2.png", "sprites/"+scene+"/idle3.png"];
var player_left_frames = ["sprites/"+scene+"/left1.png", "sprites/"+scene+"/left2.png", "sprites/"+scene+"/left3.png", "sprites/"+scene+"/left4.png", "sprites/"+scene+"/left5.png"];
var player_right_frames = ["sprites/"+scene+"/right1.png", "sprites/"+scene+"/right2.png", "sprites/"+scene+"/right3.png", "sprites/"+scene+"/right4.png", "sprites/"+scene+"/right5.png"];
var current_player_frame = 0;

var frame_count = 0;
var scene_index = { 10 : "city",  20 : "incity"};