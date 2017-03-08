"use strict";

app.controller('ClassSelectCtrl', function($scope, ClassesFactory){

	$scope.classes = ['Warrior', 'Valkyrie', 'Berserker', 'Monk', 'Wizard', 'Sorcerer', 'Conjurer', 'Thief', 'Ninja', 'Assassin', 'Random'];

	 let playerClass = {};

    $scope.setPlayerClass = (selectedClass) => {
        playerClass = new ClassesFactory.GuildHall[selectedClass]();
        console.log("playerClass: ", playerClass);
    };
});


