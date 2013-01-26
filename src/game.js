;(function(NS) {

	// proto code
	var player = null,
		health = 3,
		score = 0,
		highscore = 0;

	function initListeners () {
		$('.js-play-again-button').click(function () {
			NS.startGame();
		});

		// override stage's onClicked method
		stage.onClicked = function () {
			if(player.is_on_ground) {
				player.jump();
			}
		};
	}
	
	NS.init = function () {
		log('game initialized');
		initListeners();
		NS.Globals.player_x = ~~(W / 4);
		NS.Globals.ground_height = ~~(H * 0.5);

		player = new NS.Player();
		player.is_under_user_control = true;
		addChild(player);

		// addChild(new NS.BlackCurtain());
		
		// addChild(emitter);

		// add level manager
		addChild(level_manager);
		
		PAUSE = false;
		// debug = true;

		level_manager.startLevel(1);
	};

	NS.onLevelComplete = function () {
	};

	NS.stopGame = function (amount) {
		level_manager.reset();
		// remove bullets, asteroids and bonus items
		var entities = getAllOfType('obstacle');
		for (var i = entities.length - 1; i >= 0; i--) {
			removeChild(entities[i]);
		}
		$('body').addClass('gameover');
	};

	NS.startGame = function (amount) {
		$('body').removeClass('gameover');
		level_manager.startLevel(1);
		health = 3;
		$('.hud--life').removeClass('l1 l2');
	};

	NS.updateHealth = function (amount) {
		health += amount;
		
		document.getElementById("audHit").src = 'Hit_Hurt.wav';
		document.getElementById("audHit").volume = 1;
		document.getElementById("audHit").play();
		$('.hud--life')
			.removeClass('l1')
			.removeClass('l2')
			.addClass('l' + health);
		if(!health) {
			this.stopGame();
		}
	};

	NS.takeCollectible = function () {
		score += 100;
		$('.js-score').text(score + '');
		if(score > highscore) {
			highscore = score;
			$('.js-highscore').text(highscore + '');
		}
	};
	
	NS.createExplosion = function (x, y, level, color) {
		var num_particles = 15 + (level > 2 ? level * 8 : 0),
			particle = null;
		while (num_particles--) {
			particle = new NS.ExplosionParticle(x, y, level, color);
			addChild(particle);
		}
		particle = null;
	};

})(window.game = window.game || {});


window.addEventListener('load', function () {
	// init engine
	init('c', undefined, 300);
});
