"use strict";

app.factory("BattleFactory", function(){
console.log("BattleFactory");

	let player = {};//as the user progresses through building their character, the values and choice get stored into this object

	let setPlayerName = (name) => {
		player.name = name;
		console.log("player.name", player.name);
	};

	let setPlayerWeapon = (weapon) => {
		player.weapon = weapon;
		console.log("player.weapon", player.weapon);
	};

	let setPlayerClass = (playerClass) => {
		player.class = playerClass;
		console.log("player.class", player.class);
	};


	return{setPlayerName, setPlayerWeapon, setPlayerClass};

});