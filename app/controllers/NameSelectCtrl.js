"use strict";

app.controller('NameSelectCtrl', function($scope, BattleFactory, $window, $location){
	console.log("NameSelectCtrl");


	$scope.setPlayerName = () => {
		if($scope.playerName.length === 0){
			//put a warning here to alert user to pick a name
			return;
		}else{
			$window.location.href = "#!/classSelect";
			BattleFactory.setPlayerName($scope.playerName);
			console.log("window.location", $window.location.href);
		}
	};

});