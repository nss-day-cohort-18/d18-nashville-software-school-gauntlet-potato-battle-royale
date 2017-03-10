"use strict";

app.factory("BattleFactory", function(CombatantsFactory, WeaponFactory, ClassesFactory){
console.log("BattleFactory");

	let player = {};//as the user progresses through building their character, the values and choice get stored into this object
	let enemy = {};
	let addedBonusesPlayer = null;
	let addedBonusesEnemy = null;

	let reset = () => {
		let randoNum = Math.floor((Math.random() * 10) + 1);
		player = new CombatantsFactory.Combatants.Human();
		enemy = new CombatantsFactory.Combatants.Orc();
		if (randoNum >= 0 && randoNum <= 3) {
			enemy.class = new ClassesFactory.GuildHall.Berserker();
		} else if (randoNum >= 4 && randoNum <= 7) {
			enemy.class = new ClassesFactory.GuildHall.Assassin();
		} else {
			enemy.class = new ClassesFactory.GuildHall.Wizard();
		}
		let randoNum2 = Math.floor((Math.random() * 10) + 1);
		if (randoNum2 >= 0 && randoNum <= 3) {
			enemy.weapon = new WeaponFactory.MeleeCombat.BroadSword();
		} else if (randoNum2 >= 4 && randoNum <= 7) {
			enemy.weapon = new WeaponFactory.MeleeCombat.WarAxe();
		} else {
			enemy.weapon = new WeaponFactory.MeleeCombat.Dagger();
		}
		if (randoNum >= 0 && randoNum < 2) {
			enemy.image = "../images/orc.jpg";
		} else if (randoNum >= 2 && randoNum < 4) {
			enemy.image = "../images/orc2.jpg";
		} else if (randoNum >= 4 && randoNum < 6) {
			enemy.image = "../images/orc3.jpg";
		} else if (randoNum >= 6 && randoNum < 8) {
			enemy.image = "../images/troll.jpg";
		} else {
			enemy.image = "../images/monster2.jpg";
		}
	};

	reset();

	let setPlayerName = (name) => {
		player.name = name;
		//console.log("player.name", player.name);
	};

	let setPlayerWeapon = (weapon) => {
		player.weapon = weapon;
		//console.log("player.weapon", player.weapon);
	};

	let setPlayerSpell= (spell) => {
		player.spell = spell;
		//console.log("player.spell", player.spell);
	};


	let setPlayerClass = (playerClass) => {
		player.class = playerClass;
		//console.log("player.class", player.class);
	};

	let getPlayer = () => {
		if (addedBonusesPlayer) {
			return player;
		} else {
			player.health = player.health + player.class.healthBonus;
			player.strength = player.strength + player.class.strengthBonus;
			player.intelligence = player.intelligence + player.class.intelligenceBonus;
			player.dexterity = player.dexterity + player.class.dexterityBonus;
			addedBonusesPlayer = true;
			return player;
		}
	};

	let getEnemy = () => {
		if (addedBonusesEnemy) {
			return enemy;
		} else {
			enemy.health = enemy.health + enemy.class.healthBonus;
			enemy.strength = enemy.strength + enemy.class.strengthBonus;
			enemy.intelligence = enemy.intelligence + enemy.class.intelligenceBonus;
			enemy.dexterity = enemy.dexterity + enemy.class.dexterityBonus;
			addedBonusesEnemy = true;
			return enemy;
		}
	};

	let resetStats = () => {
		reset();
	};

	let nextEnemy= () => {
		enemy = new CombatantsFactory.Combatants.Orc();
		let randoNum = Math.floor(Math.random() * 10);
		let randoNum2 = Math.floor(Math.random() * 10);
		if (randoNum >= 0 && randoNum <= 3) {
			enemy.class = new ClassesFactory.GuildHall.Berserker();
		} else if (randoNum >= 4 && randoNum <= 7) {
			enemy.class = new ClassesFactory.GuildHall.Assassin();
		} else {
			enemy.class = new ClassesFactory.GuildHall.Wizard();
		}
		if (randoNum2 >= 0 && randoNum <= 3) {
			enemy.weapon = new WeaponFactory.MeleeCombat.BroadSword();
		} else if (randoNum2 >= 4 && randoNum <= 7) {
			enemy.weapon = new WeaponFactory.MeleeCombat.WarAxe();
		} else {
			enemy.weapon = new WeaponFactory.MeleeCombat.Dagger();
		}
		if (randoNum >= 0 && randoNum < 2) {
			enemy.image = "../images/orc.jpg";
		} else if (randoNum >= 2 && randoNum < 4) {
			enemy.image = "../images/orc2.jpg";
		} else if (randoNum >= 4 && randoNum < 6) {
			enemy.image = "../images/orc3.jpg";
		} else if (randoNum >= 6 && randoNum < 8) {
			enemy.image = "../images/troll.jpg";
		} else {
			enemy.image = "../images/monster2.jpg";
		}

		return enemy;
	};


	return{setPlayerName, setPlayerWeapon, setPlayerClass, setPlayerSpell, getPlayer, getEnemy, resetStats, nextEnemy};


});