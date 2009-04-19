/*
 An attempt to port Dwemthy's Array into JavaScript

 For fun and education
 */

function Creature(name) {
  this.name = name;

  this.hit = function( damage ) {
    var p_up = rand( this.charisma );
    if( p_up % 9 == 7 ) {
      this.life += p_up / 4;
      print("[" + this.name + " magick powers up " + p_up + "!]");
    }
    this.life -= damage;
    if( this.life <= 0 ) {
      print("[" + this.name + " has died.]");
    }
  }

  this.fight = function( enemy, weapon ) {
    // Mortality check
    if( this.life <= 0 ) {
      print("[" + this.name + " is too dead to fight!]")
      return this;
    }

    // Attack the opponent
    var damage = rand( this.strength + weapon );
    print( "[You hit with " + damage + " points of damage!]" );
    enemy.hit( damage );

    // Retaliation
    if( enemy.life > 0 ) {
      var enemy_hit = rand( enemy.strength + enemy.weapon );
      print( "[Your enemy hit with " + enemy_hit + " points of damage!]");
      this.hit( enemy_hit );
    }

    return this;
  }
}

function Rabbit() {
  var rabbit = new Creature("Rabbit");
  rabbit.life = 10;
  rabbit.strength = 2;
  rabbit.charisma = 44;
  rabbit.weapon = 4;
  rabbit.bombs = 3;

  // You could do something like rabbit["^"] to define a method with a
  // handle of ^ like the Ruby version, but a call to it would like
  // like rabbit["^"](enemy) - which lacks the niftyness of Ruby's
  // rabbit ^ enemy syntax. All of the hero's attacks are written
  // here as complete words.
  rabbit.kick = function(enemy) { this.fight(enemy, 13); }
  rabbit.slice = function(enemy) {
    this.fight( enemy, rand( 4 + Math.pow((enemy.life % 10), 2) ));
  }
  rabbit.taunt = function(enemy) {
    var boost = rand( this.charisma );
    print("[Taunting your enemy boosts your life points by " + boost + "!]");
    this.life += boost;
  }
  rabbit.explode = function(enemy) {
    if( this.bombs == 0 ) {
      print("[UHN!! You're out of bombs!!]");
      return false;
    }
    this.bombs--;
    this.fight( enemy, 86 );
    return this;
  }

  return rabbit;
}

function DwemthysArray() {}

DwemthysArray.prototype = {
  name: "DwemthysArray!",
  of: function() {
    this._contents = Array.prototype.slice.call(arguments);
    this.doppelgang();
    return this;
  },
  first: function() { return this._contents[0] },
  doppelgang: function() {
    for( var i in this.first() ) {
      if(typeof this.first()[i] != "function") {
        this[i] = this.first()[i];
      } else {
        this["__" + i] = this.first()[i];
      }
    }
  },
  __noSuchMethod__: function(id, args) {
    var answer = this["__" + id].apply(this, args);
    if( this.life <= 0 ) {
      this._contents.shift();
      this.doppelgang();
      if( this._contents.length == 0 ) {
        print("[Whoa. You decimated Dwemthy's Array!]")
      } else {
        print("[Get ready. ", this.first().name, " has emerged.]");
      }
    }
    if(answer) { return answer; }
    return 0;
  }
}

function IndustrialRaverMonkey() {
  var c = new Creature("IndustrialRaverMonkey");
  c.life = 46;
  c.strength = 35;
  c.charisma = 91;
  c.weapon = 2;
  return c;
}

function DwarvenAngel() {
  var c = new Creature("DwarvenAngel");
  c.life = 540;
  c.strength = 6;
  c.charisma = 144;
  c.weapon = 50;
  return c;
}

function AssistantViceTentacleAndOmbudsman() {
  var c = new Creature("AssistantViceTentacleAndOmbudsman");
  c.life = 320;
  c.strength = 6;
  c.charisma = 144;
  c.weapon = 50;
  return c;
}

function TeethDeer() {
  var c = new Creature("TeethDeer");
  c.life = 655;
  c.strength = 192;
  c.charisma = 19;
  c.weapon = 109;
  return c;
}

function IntrepidDecomposedCyclist() {
  var c = new Creature("IntrepidDecomposedCyclist");
  c.life = 901;
  c.strength = 560;
  c.charisma = 422;
  c.weapon = 105;
  return c;
}

function Dragon() {
  var c = new Creature("Dragon");
  c.life = 1340;        // tough scales
  c.strength = 451;     // bristling veins
  c.charisma = 1020;    // toothy smile
  c.weapon = 939;       // fire breath
  return c;
}

function debug() {
  print.apply(print, arguments)
}

function rand(n)
{
  return (Math.floor(Math.random()*n + 1));
}


var da = new DwemthysArray().of(new IndustrialRaverMonkey(),
                           new DwarvenAngel(),
                           new AssistantViceTentacleAndOmbudsman(),
                           new TeethDeer(),
                           new IntrepidDecomposedCyclist(),
                           new Dragon());
var r = new Rabbit();
