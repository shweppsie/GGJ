sound_list = new Array(12); /* an array to store the loading state of the audio */
for (var i=0; i<sound_list.length; i++) { /* initialize to false */
	sound_list[i] = false;
}
function loadSound() {
	medieval_music = new Howl({
		urls: ['audio/music/adventure.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[0] = true;
		}
	});
	grass_music = new Howl({
		urls: ['audio/music/grass.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[1] = true;
		}
	});
	daycity_music = new Howl({
		urls: ['audio/music/daycity.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[2] = true;
		}
	});
	nightcity_music = new Howl({
		urls: ['audio/music/end.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[3] = true;
		}
	});
	dragon_music = new Howl({
		urls: ['audio/music/dragon.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[4] = true;
		}
	});
	mokebattle_music_start = new Howl({
	urls: ['audio/music/mokebattle_start.mp3'],
		volume: 2.0,
		loop: false,
		onend: function() {
			mokebattle_music_loop.play();
		},
		onload: function() {
			sound_list[5] = true;
		}
	});
	mokebattle_music_loop = new Howl({
	urls: ['audio/music/mokebattle_loop.mp3'],
		volume: 2.0,
		loop: true,
		onload: function() {
			sound_list[6] = true;
		}
	});
	jazz_music = new Howl({
	urls: ['audio/music/jazz.mp3'],
		volume: 1,
		loop: true,
		onload: function() {
			sound_list[7] = true;
		}
	});
	footsteps_tile = new Howl({
		urls: ['audio/sounds/footsteps_tile.wav'],
		volume: 1.0,
		loop: true,
		onload: function() {
			sound_list[8] = true;
		}
	});
	footsteps_grass = new Howl({
		urls: ['audio/sounds/footsteps_grass.wav'],
		volume: 0.8,
		loop: true,
		onload: function() {
			sound_list[9] = true;
		}
	});
	dragon_roar = new Howl({
		urls: ['audio/sounds/dragon_roar.wav'],
		volume: 2.0,
		loop: false,
		onload: function() {
			sound_list[10] = true;
		}
	});
	evil_laugh = new Howl({
		urls: ['audio/sounds/evil_laugh.ogg'],
		volume: 1.5,
		loop: false,
		onload: function() {
			sound_list[11] = true;
		}
	});
	scene_music.push(medieval_music);
	scene_music.push(grass_music);
	scene_music.push(daycity_music);
}

function soundLoaded() {
	for (var i=0; i<sound_list.length; i++) {
		if (!sound_list[i]) {
			return false;
		}
	}
	return true;
}