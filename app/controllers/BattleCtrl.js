"use strict";

app.controller('BattleCtrl', function($scope, BattleFactory, $interval, $window){

	// setting alot of intial values into both the player and the enemy characters
	$scope.player = BattleFactory.getPlayer();
	$scope.player.health = $scope.player.health + $scope.player.class.healthBonus;
	$scope.player.strength = $scope.player.strength + $scope.player.class.strengthBonus;
	$scope.player.intelligence = $scope.player.intelligence + $scope.player.class.intelligenceBonus;
	console.log("$scope.player: ", $scope.player);
	$scope.enemy = BattleFactory.getEnemy();
	$scope.enemy.health = $scope.enemy.health + $scope.enemy.class.healthBonus;
	$scope.enemy.strength = $scope.enemy.strength + $scope.enemy.class.strengthBonus;
	$scope.enemy.intelligence = $scope.enemy.intelligence + $scope.enemy.class.intelligenceBonus;
	console.log("$scope.enemy: ", $scope.enemy);

	// healthbar meters below both players
	$scope.player.healthbar = "100";
	$scope.enemy.healthbar = "100";

	// ng-repeats on the screen to log both win and each round
	$scope.battleLog = [];
	$scope.winLog = [];

	// some initial values to store
	let auto = null;
	let turn = "";
	let enemyDamage = Number($scope.enemy.weapon.damage);
	let playerDamage = 0;
	let currentDamage = 0;
	let playerHealth = Number($scope.player.health);
	let enemyHealth = Number($scope.enemy.health);

	// defining whether the player is magical or not for his damage counter
	if ($scope.player.spell === undefined) {
		playerDamage = Number($scope.player.weapon.damage);
	} else {
		playerDamage = Number($scope.player.spell.damage);
	}

	// end game function to stop the game
	let gameOver = (win, lose) => {
		$interval.cancel(auto);
		let newObj = {};
		newObj.winner = win;
		newObj.loser = lose;
		newObj.damage = currentDamage;
		$scope.winLog.push(newObj);
		if ($scope.winLog.length > 1) {
			$scope.winLog.shift();
		}
		$('#winnerModal').modal('show');
	};

	// simply start over function brings you back to the begining and resets the stats of the characters
	$scope.startOver = () => {
		$('#winnerModal').modal('hide');
		BattleFactory.resetStats();
		$window.location.href = "#!/";
	};

	// keeping the amount of logs onscreen to a minimum for not running off page
	let reduceLog = () => {
		if ($scope.battleLog.length > 17) {
			$scope.battleLog.shift();
		}
	};

	// the attack function for who strikes first and each blow after
	$scope.attack = () => {
		if (turn === "") {
			let whosTurn = Math.floor(Math.random() * 10 + 1);
			if (whosTurn < 5) {
				turn = "player";
			} else {
				turn = "enemy";
			}
		}

		if (turn === "player") {
			playerAttack();
			turn = "enemy";
		} else if (turn === "enemy") {
			enemyAttack();
			turn = "player";
		}
	};

	// allow user to automatically attack instead of clicking 'attack' over n' over
	$scope.autoAttack = () => {
		console.log("What are you lazy? just click the attack button jeez");
		auto = $interval(function(){
			$scope.attack();
			console.log("auto running");
		}, 1000);
	};

	// stop the automatic attacks
	$scope.stopAutoAttack = () => {
		$interval.cancel(auto);
	};

	// function for just the players attack 'attack()' fires this
	let playerAttack = () => {
		let newObj = {
			turn: "player",
			highlight: "bg-success",
			attacker: "You",
			attackee: "Orc",
			damage: "0"
		};

		newObj.damage = playerDamage - Math.floor(Math.random() * 10 + 1);
		currentDamage = newObj.damage;
		$scope.enemy.healthbar = Math.floor( (($scope.enemy.health - currentDamage) / enemyHealth) * 100 );
		$scope.enemy.health = $scope.enemy.health - newObj.damage;
		$scope.battleLog.push(newObj);
		if ($scope.enemy.health < 1) {
			$scope.enemy.health = 0;
			gameOver("You", "Orc");
		}
		reduceLog();
	};

	// function for the enemy's attack 'attack()' fires this
	let enemyAttack = () => {
		let newObj = {
			turn: "enemy",
			highlight: "bg-danger",
			attacker: "Orc",
			attackee: "You",
			damage: "0"
		};

		newObj.damage = enemyDamage - Math.floor(Math.random() * 10 + 1);
		currentDamage = newObj.damage;
		$scope.player.healthbar = Math.floor( (($scope.player.health - currentDamage) / playerHealth) * 100 );
		$scope.player.health = $scope.player.health - newObj.damage;
		$scope.battleLog.push(newObj);
		if ($scope.player.health < 1) {
			$scope.player.health = 0;
			gameOver("Orc", "You");
		}
		reduceLog();
	};

});