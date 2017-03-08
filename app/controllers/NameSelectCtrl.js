"use strict";

app.controller('NameSelectCtrl', function($scope, BattleFactory, $window){
	console.log("NameSelectCtrl");


	$scope.setPlayerName = () => {
		if($scope.playerName.length === 0){
			//put a warning here to alert user to pick a name
			return;
		}else{
			BattleFactory.setPlayerName($scope.playerName);
			$window.location.href = "#!/classSelect";
		}
	};

});