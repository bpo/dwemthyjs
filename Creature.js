/*
 An attempt to port Dwemthy's Array into JavaScript

 For fun and education
 */

function Creature(name) {
  this._traits = {};
  this._name = name;

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

  this.hit = function( damage ) {
    var p_up = rand( this.charisma() );
    if( p_up % 9 == 7 ) {
      this.life( this.life() + p_up / 4 );
      print("[" + this._name + " magick powers up " + p_up + "!]");
    }
    this.life( this.life() - damage );
    if( this.life() <= 0 ) {
      print("[" + this._name + " has died.]");
    }
  }

  this.fight = function( enemy, weapon ) {
    // Mortality check
    if( this.life() <= 0 ) {
      print("[" + this._name + " is too dead to fight!]")
      return this;
    }

    // Attack the opponent
    var damage = rand( this.strength() + this.weapon() );
    print( "[You hit with " + damage + " points of damage!]" );
    enemy.hit( damage );

    // Retaliation
    if( enemy.life() > 0 ) {
      var enemy_hit = rand( enemy.strength() + enemy.weapon() );
      print( "[Your enemy hit with " + enemy_hit + " points of damage!]");
      this.hit( enemy_hit );
    }

    return this;
  }

  // default traits shared by all creatures
  this.traits("life", "strength", "charisma", "weapon");
}

function Rabbit() {
  var rabbit = new Creature("Rabbit");
  rabbit.traits("bombs");
  rabbit.life(10);
  rabbit.strength(2);
  rabbit.charisma(44);
  rabbit.weapon(4);
  rabbit.bombs(3);

  // You could do something like rabbit["^"] to define a method with a
  // handle of ^ like the Ruby version, but a call to it would like
  // like rabbit["^"](enemy) - which lacks the niftyness of Ruby's
  // rabbit ^ enemy syntax. All of the hero's attacks are written
  // here as complete words.
  rabbit.kick = function(enemy) { this.fight(enemy, 13); }
  rabbit.slice = function(enemy) {
    this.fight( enemy, rand( 4 + Math.pow((enemy.life() % 10), 2) ));
  }

  return rabbit;
}


/*Rabbit.prototype = {
  "^": function(enemy) { this.fight(enemy, 13); },
  yodel: function(enemy) { this.fight(enemy, 13); }
}*/

function IndustrialRaverMonkey() {
  var monkey = new Creature("IndustrialRaverMonkey");
  monkey.life(46);
  monkey.strength(35);
  monkey.charisma(91);
  monkey.weapon(2);
  return monkey;
}

function debug() {
  print.apply(print, arguments)
}

function puts(message) {
  
}

function rand(n)
{
  return (Math.floor(Math.random()*n + 1));
}

var r = new Rabbit();
var m = new IndustrialRaverMonkey();
r.kick(m);
r.slice(m);
