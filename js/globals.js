// Globals
var CANVAS_WIDTH = document.getElementById("game-canvas").width;
var CANVAS_HEIGHT = document.getElementById("game-canvas").height;

var speed = 1;
var scene = 'city';

var sprite_animation_counter = 0;
var sprite_animation_speed = 8;
var player;
var playerX = CANVAS_WIDTH/2;
var playerY = CANVAS_HEIGHT-220;
var player_frames = ["sprites/"+scene+"/dude1.png", "sprites/"+scene+"/dude2.png", "sprites/"+scene+"/dude3.png", "sprites/"+scene+"/dude2.png"];
var current_player_frame = 0;