"use strict";

app.controller('NameSelectCtrl', function($scope, BattleFactory, $window, $location){
	console.log("NameSelectCtrl");


	$scope.setPlayerName = () => {
		if($scope.playerName === undefined || $scope.playerName === ""){
			//put a warning here to alert user to pick a name
			$(".newPinAlert").hide().show('medium');
			return;
		}else{
			$window.location.href = "#!/classSelect";
			BattleFactory.setPlayerName($scope.playerName);
			// console.log("window.location", $window.location.href);
		}
	};

});