function Creature(name, traits) {
  this[name] = function() { return new Mob(name, traits) };
}

function Mob(name, traits) {
  this.name = name;
  for( var i in traits ) {
    this[i] = traits[i];
  }
}

Mob.prototype.hit = function( damage ) {
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

Mob.prototype.fight = function( enemy, weapon) {
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

function DwemthysArray() {}

DwemthysArray.prototype = {
  of: function() {
    // arguments isn't a real array, so we create a new one
    this._contents = Array.prototype.slice.call(arguments);
    this.doppelgang();
    return this;
  },
  first: function() { return this._contents[0] },

  // using this function, DwemthysArray actually "becomes" its first
  // Creature. Copy all the properties, and grab the functions also.
  // Functions written to a special namespace so the Array can react
  // above and beyond the way the Creature does.
  doppelgang: function() {
    for( var i in this.first() ) {
      if(typeof this.first()[i] != "function") {
        this[i] = this.first()[i];
      } else {
        this["__" + i] = this.first()[i];
      }
    }
  },

  // delegates actions to the first Creature, and grabs new creatures
  // if one dies.
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

function rand(n)
{
  return (Math.floor(Math.random()*n + 1));
}

Creature("Rabbit", {
  life: 10,
  strength: 2,
  charisma: 44,
  weapon: 4,
  bombs: 3,

  // You could do something like "^": to define a method with a
  // handle of ^ like the Ruby version, but a call to it would like
  // like rabbit["^"](enemy) - which lacks the niftyness of Ruby's
  // rabbit ^ enemy syntax. All of the hero's attacks are written
  // here as complete words.
  kick: function(enemy) { this.fight(enemy, 13); },
  slice: function(enemy) {
    this.fight( enemy, rand( 4 + Math.pow((enemy.life % 10), 2) ));
  },
  taunt: function(enemy) {
    var boost = rand( this.charisma );
    print("[Taunting your enemy boosts your life points by " + boost + "!]");
    this.life += boost;
  },
  bomb: function(enemy) {
    if( this.bombs == 0 ) {
      print("[UHN!! You're out of bombs!!]");
      return false;
    }
    this.bombs--;
    this.fight( enemy, 86 );
    return this;
  }
});

Creature("IndustrialRaverMonkey", {
  life: 46,
  strength: 35,
  charisma: 91,
  weapon: 2
});

Creature("DwarvenAngel", {
  life: 540,
  strength: 6,
  charisma: 144,
  weapon: 50
});

Creature("AssistantViceTentacleAndOmbudsman", {
  life: 320,
  strength: 6,
  charisma: 144,
  weapon: 50
});

Creature("TeethDeer", {
  life: 655,
  strength: 192,
  charisma: 19,
  weapon: 109
});

Creature("IntrepidDecomposedCyclist", {
  life: 901,
  strength: 560,
  charisma: 422,
  weapon: 105
});

Creature("Dragon", {
  life: 1340,       // tough scales
  strength: 451,    // bristling veins
  charisma: 1020,   // toothy smile
  weapon: 939       // fire breath
});
