"use strict";

app.factory("ClassesFactory", function() {
console.log("ClassesFactory");

var GuildHall = {};

/*
  Base function for a player, or enemy, class (profession)
 */
GuildHall.PlayerClass = function() {
  this.name = "Beggar";
  this.healthBonus = 0;
  this.strengthBonus = 0;
  this.intelligenceBonus = 0;
  this.dexterityBonus = 0;
  this.magical = false;

  this.toString = function() {
    return this.name;
  };
};

/*
    FIGHTER CLASSES
      - Warrior
      - Valkyrie
      - Berserker
      - Monk
 */
GuildHall.Fighter = function() {
  this.image = "../images/barbarian2.jpg";
  this.bonus  = "Str";
  this.ac = 9;
  this.healthBonus = 20;
  this.strengthBonus = 10;
  this.dexterityBonus = 5;
};
GuildHall.Fighter.prototype = new GuildHall.PlayerClass();


GuildHall.Warrior = function() {
  this.name = "Warrior";
  this.healthBonus = this.healthBonus + 25;
  this.strengthBonus = this.strengthBonus + 30;
  this.dexterityBonus = this.dexterityBonus + 15;
};
GuildHall.Warrior.prototype = new GuildHall.Fighter();


GuildHall.Valkyrie = function() {
  this.image = "../images/valk.jpg";
  this.name = "Valkyrie";
  this.healthBonus = this.healthBonus + 20;
  this.strengthBonus = this.strengthBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 15;
};
GuildHall.Valkyrie.prototype = new GuildHall.Fighter();


GuildHall.Berserker = function() {
  this.image = "../images/beserker.jpg";
  this.name = "Berserker";
  this.healthBonus = this.healthBonus + 35;
  this.strengthBonus = this.strengthBonus + 20;
  this.dexterityBonus = this.dexterityBonus + 15;
};
GuildHall.Berserker.prototype = new GuildHall.Fighter();


GuildHall.Monk = function() {
  this.image = "../images/monk.jpg";
  this.name = "Monk";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 40;
  this.dexterityBonus = this.dexterityBonus + 25;
};
GuildHall.Monk.prototype = new GuildHall.Fighter();


/*
    MAGICAL CLASSES
      - Shaman
      - Wizard
      - Conujurer
      - Sorcerer
 */
GuildHall.Mage = function() {
  this.image = "../images/mage2.jpg";
  this.bonus = "Int";
  this.ac = 7;
  this.magical = true;
  this.healthBonus = this.healthBonus - 10;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 20;
  this.dexterityBonus = this.dexterityBonus - 5;
};
GuildHall.Mage.prototype = new GuildHall.PlayerClass();


GuildHall.Shaman = function() {
  this.name = "Shaman";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 20;
  this.dexterityBonus = this.dexterityBonus - 10;
};
GuildHall.Shaman.prototype = new GuildHall.Mage();


GuildHall.Wizard = function() {
  this.name = "Wizard";
  this.healthBonus = this.healthBonus - 15;
  this.strengthBonus = this.strengthBonus - 25;
  this.intelligenceBonus = this.intelligenceBonus + 40;
  this.dexterityBonus = this.dexterityBonus + 5;
};
GuildHall.Wizard.prototype = new GuildHall.Mage();


GuildHall.Conjurer = function() {
  this.image = "../images/conj.jpg";
  this.name = "Conjurer";
  this.strengthBonus = this.strengthBonus - 10;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 5;
};
GuildHall.Conjurer.prototype = new GuildHall.Mage();


GuildHall.Sorcerer = function() {
  this.image = "../images/sorcerer.jpg";
  this.name = "Sorcerer";
  this.healthBonus = this.healthBonus - 5;
  this.strengthBonus = this.strengthBonus - 20;
  this.intelligenceBonus = this.intelligenceBonus + 30;
  this.dexterityBonus = this.dexterityBonus - 5;
};
GuildHall.Sorcerer.prototype = new GuildHall.Mage();


/*
    STEALTH CLASSES
      - Thief
      - Ninja
      - Assassin
 */

GuildHall.Sneaky = function () {
  this.image = "../images/thief2.jpg";
  this.bonus = "Dex";
  this.ac = 8;
  this.healthBonus = 15;
  this.strengthBonus = 5;
  this.intelligenceBonus = 20;
  this.dexterityBonus = 25;
};
GuildHall.Sneaky.prototype = new GuildHall.PlayerClass();

GuildHall.Thief = function () {
  this.name = "Thief";
  this.healthBonus = this.healthBonus - 5;
  this.intelligenceBonus = this.intelligenceBonus + 10;
  this.dexterityBonus = this.dexterityBonus + 15;
};
GuildHall.Thief.prototype = new GuildHall.Sneaky();

GuildHall.Ninja = function () {
  this.image = "../images/ninja.jpg";
  this.name = "Ninja";
  this.healthBonus = this.healthBonus + 5;
  this.strengthBonus = this.strengthBonus + 10;
  this.intelligenceBonus = this.intelligenceBonus + 5;
  this.dexterityBonus = this.dexterityBonus + 20;
};
GuildHall.Ninja.prototype = new GuildHall.Sneaky();

GuildHall.Assassin = function () {
  this.image = "../images/assassin.jpg";
  this.name = "Assassin";
  this.healthBonus = this.healthBonus + 10;
  this.strengthBonus = this.strengthBonus + 5;
  this.intelligenceBonus = this.intelligenceBonus + 5;
  this.dexterityBonus = this.dexterityBonus + 30;
};
GuildHall.Assassin.prototype = new GuildHall.Sneaky();

return {GuildHall};

});