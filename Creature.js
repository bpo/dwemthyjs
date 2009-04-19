/*
 An attempt to port Dwemthy's Array into JavaScript

 For fun and education
 */

// _initialization_ is a custom constructor method for subclassing
function Creature(initialization) {
  this._traits = {};

  // with no arguments, return all the traits
  // with arguments, add new traits
  this.traits = function() {
    for( var i = 0; i < arguments.length; i++ ) {
      this[arguments[i]] = this.trait_function(arguments[i]);
    }
    return this._traits;
  }

  // Returns a new function for a trait
  //
  // When called without an argument, this function will return the
  // value of the trait.
  // If called with an argument, it will set the trait to the
  // appropriate value.
  this.trait_function = function(trait) {
    var f = function() {
      if(arguments.length == 0) { return this._traits[trait]; }

      var val = arguments[0];
      this._traits[trait] = val;
      return val;
    }
    return f;
  }

  // default traits shared by all creatures
  this.traits("life", "strength", "charisma", "weapon");
  // call the custom constructor if necessary
  if(initialization) { initialization(); }
}

function Rabbit() {
  var rabbit = new Creature();
  rabbit.traits("bombs");
  rabbit.life(10);
  rabbit.strength(2);
  rabbit.charisma(44);
  rabbit.weapon(4);
  rabbit.bombs(3);
  return rabbit;
}

Rabbit.prototype = {
  "^": function(enemy) { this.fight(enemy, 13); }
}

function debug() {
  print.apply(print, arguments)
}

var r = new Rabbit();
