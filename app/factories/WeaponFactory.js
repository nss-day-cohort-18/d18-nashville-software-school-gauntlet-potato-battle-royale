"use strict";

app.factory("WeaponFactory", function() {

var MeleeCombat = {};

MeleeCombat.Weapon = function() {
  this.name = "bare hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
};

MeleeCombat.Dagger = function() {
  this.name = "dagger";
  this.damage = 4;
  this.hands = 1;
};
MeleeCombat.Dagger.prototype = new MeleeCombat.Weapon();

MeleeCombat.BroadSword = function() {
  this.name = "broad sword";
  this.damage = 14;
  this.hands = 2;
};
MeleeCombat.BroadSword.prototype = new MeleeCombat.Weapon();

MeleeCombat.WarAxe = function() {
  this.name = "war axe";
  this.damage = 18;
  this.hands = 2;
};
MeleeCombat.WarAxe.prototype = new MeleeCombat.Weapon();



return {MeleeCombat};

});