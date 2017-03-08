"use strict";

app.controller('ClassSelectCtrl', function($scope, $window, ClassesFactory, BattleFactory){

	$scope.classes = ['Warrior', 'Valkyrie', 'Berserker', 'Monk', 'Wizard', 'Sorcerer', 'Conjurer', 'Thief', 'Ninja', 'Assassin', 'Random'];

    $scope.setPlayerClass = (selectedClass) => {
      var playerClass = new ClassesFactory.GuildHall[selectedClass]();
      BattleFactory.setPlayerClass(playerClass);
      if (playerClass.magical === true){
      	$window.location.href = "#!/spellSelect";
      } else {
      	$window.location.href = "#!/weaponSelect";
    	}
    };
});


