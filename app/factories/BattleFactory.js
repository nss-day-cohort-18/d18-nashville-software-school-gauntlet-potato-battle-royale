"use strict";

app.factory("BattleFactory", function(){

	let player = {};//as the user progresses through building their character, the values and choice get stored into this object

	let setPlayerName = (name) => {
		player.name = name;
	};





	return{setPlayerName};
});