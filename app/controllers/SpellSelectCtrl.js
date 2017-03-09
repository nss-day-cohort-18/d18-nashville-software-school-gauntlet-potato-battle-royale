"use strict";

app.controller('SpellSelectCtrl', function($scope, $window, SpellsFactory, BattleFactory){

	$scope.spells = ["Lightning", "Fire", "Ice", "Earth", "Mysticism"];

	let playerSpell = {};

    $scope.setPlayerSpell = (selectedSpell) => {
      playerSpell = new SpellsFactory.SpellBook[selectedSpell]();
    	BattleFactory.setPlayerSpell(playerSpell);
    	$window.location.href = "#!/battle";
    };
});