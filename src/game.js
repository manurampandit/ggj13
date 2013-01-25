;(function(NS) {

	// proto code
	var player = null;
	
	NS.init = function () {
		log('game initialized');
		NS.Globals.player_x = ~~(W / 4);
		NS.Globals.ground_height = ~~(H * 0.5);

		player = new NS.Player();
		player.is_under_user_control = true;
		addChild(player);

		addChild(new NS.BlackCurtain());

		// add level manager
		addChild(level_manager);
		
		PAUSE = false;
		debug = true;

		level_manager.startLevel(1);
	};

	NS.onLevelComplete = function () {

	};

	NS.fdf = function () {

	};



})(window.game = window.game || {});


window.addEventListener('load', function () {
	// init engine
	init('c', undefined, 300);
});