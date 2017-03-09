"use strict";

app.factory("BattleFactory", function(CombatantsFactory, WeaponFactory, ClassesFactory){
console.log("BattleFactory");

	let player = {};//as the user progresses through building their character, the values and choice get stored into this object
	let enemy = {};
	let addedBonusesPlayer = null;
	let addedBonusesEnemy = null;

	player = new CombatantsFactory.Combatants.Player();
	enemy = new CombatantsFactory.Combatants.Orc();
	enemy.weapon = new WeaponFactory.MeleeCombat.WarAxe();
	enemy.class = new ClassesFactory.GuildHall.Warrior();

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
			addedBonusesEnemy = true;
			return enemy;
		}
	};

	let resetStats = () => {
		player = new CombatantsFactory.Combatants.Player();
		enemy = new CombatantsFactory.Combatants.Orc();
		enemy.weapon = new WeaponFactory.MeleeCombat.WarAxe();
		enemy.class = new ClassesFactory.GuildHall.Warrior();
	};

	return{setPlayerName, setPlayerWeapon, setPlayerClass, setPlayerSpell, getPlayer, getEnemy, resetStats};


});