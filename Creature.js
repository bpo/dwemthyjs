/*
 An attempt to port Dwemthy's Array into JavaScript

 For fun and education
 */

// _initialization_ is a custom constructor method for subclassing
function Creature(initialization) {
  self = this;
  self._traits = {};

  // with no arguments, return all the traits
  // with arguments, add new traits
  self.traits = function() {
    if(arguments.length == 0) { return self._traits; }

    for( var i = 0; i < arguments.length; i++ ) {
      self[arguments[i]] = self.trait_function(arguments[i]);
    }
  }

  // Returns a new function for a trait
  //
  // When called without an argument, this function will return the
  // value of the trait.
  // If called with an argument, it will set the trait to the
  // appropriate value.
  self.trait_function = function(trait) {
    f = function() {
      if(arguments.length == 0) { return this._traits[trait] };

      val = arguments[0];
      this._traits[trait] = val;
    }
    return f;
  }

  // default traits shared by all creatures
  self.traits("life", "strength", "charisma", "weapon");
  // call the custom constructor if necessary
  if(initialization) { initialization(); }
}

Rabbit = new Creature( function() {
  self.traits("bombs");
  self.life(10);
  self.strength(2);
  self.charisma(44);
  self.weapon(4);
  self.bombs(3);
  });

Rabbit.prototype = {

}

function debug() {
  call_f(print, arguments)
}

function call_f(f,args)
{
  f.call_self = function(ars)
  {
    var callstr = "";
    for(var i = 0; i < ars.length; i++)
    {
      callstr += "ars["+i+"]";
      if(i < ars.length - 1)
      {
        callstr += ',';
      }
    }
    eval("this("+callstr+")");
  };

  return f.call_self(args);
}

c = new Creature();
c.traits("foo", "bar", "baz");

c.foo(12);
print("c.foo", c.foo());

//print("c.foo", c.foo);
//print("c.traits", c.traits());
//call_f(print, c.traits());
