"use strict";

app.controller('BattleCtrl', function($scope, BattleFactory, $interval, $window){

	// setting alot of intial values into both the player and the enemy characters
	$scope.player = BattleFactory.getPlayer();
	console.log("$scope.player: ", $scope.player);
	$scope.enemy = BattleFactory.getEnemy();
	console.log("$scope.enemy: ", $scope.enemy);

	// healthbar meters below both players
	$scope.player.healthbar = "100";
	$scope.player.specialbar = "0";
	$scope.player.special = 0;
	$scope.enemy.healthbar = "100";
	$scope.enemy.specialbar = "0";
	$scope.enemy.special = 0;

	// ng-repeats on the screen to log both win and each round
	$scope.battleLog = [];
	$scope.winLog = [];

	// some initial values to store
	let playerIntSpec = null;
	let enemyIntSpec = null;
	let playerSpecialCounter = 0;
	let enemySpecialCounter = 0;
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
		if ($scope.battleLog.length > 6) {
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
			if (enemyIntSpec === true) {
				playerMiss(0);
				enemyIntSpec = false;
			} else {
				let roll = Math.round((Math.random() * 20));
				if (roll > $scope.player.class.ac) {
					playerAttack();
				} else {
					playerMiss(roll);
				}
			}
			turn = "enemy";
		} else if (turn === "enemy") {
			if (playerIntSpec === true) {
				enemyMiss(0);
				playerIntSpec = false;
			} else {
				let roll = Math.round((Math.random() * 20));
				if (roll > $scope.enemy.class.ac) {
					enemyAttack();
				} else {
					enemyMiss(roll);
				}
			}
			turn = "player";
		}
	};

	let autoAttacking = false;
	// allow user to automatically attack instead of clicking 'attack' over n' over
	$scope.autoAttack = () => {
		if (autoAttacking === true) {
			console.log("you are already auto attacking dick");
			return;
		}
		autoAttacking = true;
		console.log("What are you lazy? just click the attack button jeez");
		auto = $interval(function(){
			$scope.attack();
			console.log("auto running");
		}, 1000);
	};

	// stop the automatic attacks
	$scope.stopAutoAttack = () => {
		autoAttacking = false;
		$interval.cancel(auto);
	};

	// function for just the players attack 'attack()' fires this
	let playerAttack = () => {
		$scope.player.specialbar = "0";
		$scope.player.special = 0;
		playerSpecialCounter = 0;
		let newObj = {
			turn: "player",
			highlight: "bg-success"
		};
		newObj.damage = playerDamage - Math.floor(Math.random() * 10 + 1);
		newObj.string = "You hit Orc for " +  newObj.damage + " hp!";
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

	let playerMiss = (roll) => {
		if (playerSpecialCounter == 2) {
			playerSpecial();
			return;
		}
		playerSpecialCounter++;
		$scope.player.special = playerSpecialCounter;
		$scope.player.specialbar = Math.floor((playerSpecialCounter / 2) * 100);
		let newObj = {};
		newObj.string = "You rolled a " + roll + " and missed!";
		newObj.highlight = "bg-warning";
		$scope.battleLog.push(newObj);
		reduceLog();
	};

	// function for the enemy's attack 'attack()' fires this
	let enemyAttack = () => {
		$scope.enemy.specialbar = "0";
		$scope.enemy.special = 0;
		enemySpecialCounter = 0;
		let newObj = {
			turn: "enemy",
			highlight: "bg-danger"
		};

		newObj.damage = enemyDamage - Math.floor(Math.random() * 10 + 1);
		newObj.string = "Orc hit You for " +  newObj.damage + " hp!";
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

	let enemyMiss = (roll) => {
		if (enemySpecialCounter == 2) {
			enemySpecial();
			return;
		}
		enemySpecialCounter++;
		$scope.enemy.special = enemySpecialCounter;
		$scope.enemy.specialbar = Math.floor((enemySpecialCounter / 2) * 100);
		let newObj = {};
		newObj.string = "Orc rolled a " + roll + " and missed!";
		newObj.highlight = "bg-warning";
		$scope.battleLog.push(newObj);
		reduceLog();
	};

	let playerSpecial = () => {
		let newObj = {};
		newObj.highlight = "bg-primary";

		let specialAmount = Math.floor(Math.random() * 10 + 1);

		playerSpecialCounter = 0;
		$scope.player.special = 0;
		$scope.player.specialbar = "0";
		if ($scope.player.class.bonus == "Str") {
			console.log("Strength special player!");
			newObj.string = "Your Special hit for " + (specialAmount + 5) + " Damage!";
			$scope.enemy.healthbar = Math.floor( (($scope.enemy.health - (specialAmount + 5)) / enemyHealth) * 100 );
			$scope.enemy.health = $scope.enemy.health - (specialAmount + 5);
		} else if ($scope.player.class.bonus == "Dex") {
			console.log("Dexterity special player!");
			newObj.string = "Your Special stole life of " + specialAmount + " Health!";
			$scope.enemy.healthbar = Math.floor( (($scope.enemy.health - specialAmount) / enemyHealth) * 100 );
			$scope.enemy.health = $scope.enemy.health - specialAmount;
			$scope.player.health = $scope.player.health + specialAmount;
			$scope.player.healthbar = Math.floor( (($scope.player.health + specialAmount) / playerHealth) * 100 );
		} else if ($scope.player.class.bonus == "Int") {
			console.log("Intelligence special player!");
			newObj.string = "Your Special prevents the Enemy's attack!";
			playerIntSpec = true;
		}
		$scope.battleLog.push(newObj);
		if ($scope.enemy.health < 1) {
			$scope.enemy.health = 0;
			gameOver("You", "Orc");
		}
	};

	let enemySpecial = () => {
		let newObj = {};
		newObj.highlight = "bg-primary";

		let specialAmount = Math.floor(Math.random() * 10 + 1);

		playerSpecialCounter = 0;
		$scope.enemy.special = 0;
		$scope.enemy.specialbar = "0";
		if ($scope.enemy.class.bonus == "Str") {
			console.log("strength special enemy!");
			newObj.string = "Enemy's Special hit for " + (specialAmount + 5) + " Damage!";
			$scope.player.healthbar = Math.floor( (($scope.player.health - (specialAmount + 5)) / playerHealth) * 100 );
			$scope.player.health = $scope.player.health - (specialAmount + 5);
		} else if ($scope.enemy.class.bonus == "Dex") {
			console.log("Dexterity special enemy!");
			newObj.string = "Enemy's Special stole life of " + specialAmount + " Health!";
			$scope.player.healthbar = Math.floor( (($scope.player.health - specialAmount) / playerHealth) * 100 );
			$scope.player.health = $scope.player.health - specialAmount;
			$scope.enemy.health = $scope.enemy.health + specialAmount;
			$scope.enemy.healthbar = Math.floor( (($scope.enemy.health + specialAmount) / enemyHealth) * 100 );
		} else if ($scope.enemy.class.bonus == "Int") {
			console.log("Intelligence special enemy!");
			newObj.string = "Enemy's Special prevents the Your attack!";
			enemyIntSpec = true;
		}
		$scope.battleLog.push(newObj);
		if ($scope.player.health < 1) {
			$scope.player.health = 0;
			gameOver("Orc", "You");
		}
	};


});