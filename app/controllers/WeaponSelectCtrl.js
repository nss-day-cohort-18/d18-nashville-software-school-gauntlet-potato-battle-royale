"use strict";

app.controller('WeaponSelectCtrl', function($scope, BattleFactory, $window, WeaponFactory){
	

	$scope.weapons = [
		"Dagger",
		"BroadSword",
		"WarAxe"
	];


	$scope.setWeapon = (weapon) => {
		let blah = new WeaponFactory.MeleeCombat[weapon]();
		// console.log("my weapon", blah);
		BattleFactory.setPlayerWeapon(blah);
		$window.location.href = "#!/battle";
	};
});