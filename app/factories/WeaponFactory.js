"use strict";

app.factory("WeaponFactory", function() {

var MeleeCombat = {};

MeleeCombat.Weapon = function() {
  this.name = "Bare Hands";
  this.damage = 1;
  this.hands = 2;

  this.toString = function() {
    return this.name;
  };
};

MeleeCombat.Dagger = function() {
  this.name = "Dagger";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.hands = 1;
};
MeleeCombat.Dagger.prototype = new MeleeCombat.Weapon();

MeleeCombat.BroadSword = function() {
  this.name = "Broad Sword";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.hands = 2;
};
MeleeCombat.BroadSword.prototype = new MeleeCombat.Weapon();

MeleeCombat.WarAxe = function() {
  this.name = "War Axe";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.hands = 2;
};
MeleeCombat.WarAxe.prototype = new MeleeCombat.Weapon();



return {MeleeCombat};

});