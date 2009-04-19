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

  // accepts a json structure of key-value pairs for traits
  // we could just as easily substitute _traits for the argument passed here
  this.set_traits = function(traits) {
    for( var i in traits ) {
      this[i].call(this, traits[i]);
    }
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
    var damage = rand( this.strength() + weapon );
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
  rabbit.set_traits({
    life: 10,
    strength: 2,
    charisma: 44,
    weapon: 4,
    bombs: 3
  });

  // You could do something like rabbit["^"] to define a method with a
  // handle of ^ like the Ruby version, but a call to it would like
  // like rabbit["^"](enemy) - which lacks the niftyness of Ruby's
  // rabbit ^ enemy syntax. All of the hero's attacks are written
  // here as complete words.
  rabbit.kick = function(enemy) { this.fight(enemy, 13); }
  rabbit.slice = function(enemy) {
    this.fight( enemy, rand( 4 + Math.pow((enemy.life() % 10), 2) ));
  }
  rabbit.taunt = function(enemy) {
    var boost = rand( this.charisma() );
    print("[Taunting your enemy boosts your life points by " + boost + "!]");
    this.life(this.life() + boost);
  }
  rabbit.explode = function(enemy) {
    if( this.bombs() == 0 ) {
      print("[UHN!! You're out of bombs!!]");
      return false;
    }
    this.bombs(this.bombs() - 1);
    this.fight( enemy, 86 );
    return this;
  }

  return rabbit;
}

function IndustrialRaverMonkey() {
  var monkey = new Creature("IndustrialRaverMonkey");
  monkey.set_traits({
    life: 46,
    strength: 35,
    charisma: 91,
    weapon: 2
  });
  return monkey;
}

function debug() {
  print.apply(print, arguments)
}

function rand(n)
{
  return (Math.floor(Math.random()*n + 1));
}

var r = new Rabbit();
var m = new IndustrialRaverMonkey();
r.taunt(m);
r.taunt(m);
r.taunt(m);
r.taunt(m);
r.explode(m);
r.explode(m);
r.explode(m);
r.explode(m);
r.kick(m);
r.slice(m);
