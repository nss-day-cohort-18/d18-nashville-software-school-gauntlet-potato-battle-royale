"use strict";

let app = angular.module("BattleRoyale", ["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider.
	when("/", {
		templateUrl: "partials/NameSelect.html",
		controller: "NameSelectCtrl"
	}).
	when("/classSelect", {
		templateUrl: "partials/ClassSelect.html",
		controller: "ClassSelectCtrl"
	}).
	when("/weaponSelect", {
		templateUrl: "partials/WeaponSelect.html",
		controller: "WeaponSelectCtrl"
	}).
	when("/battle", {
		templateUrl: "partials/Battle.html",
		controller: "BattleCtrl"
	}).
	otherwise("/");
});