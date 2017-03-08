"use strict";

app.factory("SpellsFactory", function() {

var SpellBook = {};

/*
  Base spell function that defines name, damage, damage type
 */
SpellBook.Spell = function() {
  this.name = "";
  this.damage = 0;
  this.type = "";

  this.toString = function() {
    return this.name + " of " + this.type + " for " + this.damage + " damage!";
  };
};

SpellBook.Lightning = function() {
  this.name = "Lightning Strike";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.type = "lightning";
};
SpellBook.Lightning.prototype = new SpellBook.Spell();

SpellBook.Fire = function() {
  this.name = "FireBall";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.type = "fire";
};
SpellBook.Fire.prototype = new SpellBook.Spell();

SpellBook.Ice = function() {
  this.name = "Ice Spike";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.type = "ice";
};
SpellBook.Ice.prototype = new SpellBook.Spell();

SpellBook.Earth = function() {
  this.name = "Earthquake";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.type = "earth";
};
SpellBook.Earth.prototype = new SpellBook.Spell();

SpellBook.Mysticism = function() {
  this.name = "Holy Smite";
  this.damage = Math.floor(Math.random() * 10 + 10);
  this.type = "mysticism";
};
SpellBook.Mysticism.prototype = new SpellBook.Spell();


return {SpellBook};

});