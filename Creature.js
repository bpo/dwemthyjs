function Creature() {
  self = this;
  this._traits = {};
}

Creature.prototype = {
  traits: function() {
    if(arguments.length == 0) { return self._traits; }

    for( var i = 0; i < arguments.length; i++ ) {
      self[arguments[i]] = self.trait_function(arguments[i]);
      debug("Argument", arguments[i]);
    }
  },

  hello_function: function() { print("hello"); },

  trait_function: function(trait) {
    f = function() {
      if(arguments.length == 0) { return this._traits[trait] };

      val = arguments[0];
      debug("Function call: ", trait, "(", val, ")" );
      if(!self._traits) { self._traits = {}; };
      this._traits[trait] = val;
    }
    // debug("Generated trait function: ", f);
    return f;
  }
};

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
