define([ 'use!underscore' ], function(_) {
  describe("objects and context", function() {
    var a, b, C, fn;

    beforeEach(function() {
      fn = function(arg) {
        if (typeof arg == "undefined") { 
          a.name = 'Rebecca';
          a.greeting = 'Yo';
          return a.sayIt()
        };
      };

      a = {
        name : 'Matt',
        greeting : 'Hello',
        sayIt : function() {
          return  this.greeting + ', ' +
                  this.name + '!';
        }
      };

      b = {
        name : 'Rebecca',
        greeting : 'Yo'
      };

      C = function(name) {
        this.name = name;
        return this;
      };
    });

    it("you should be able to alter the context in which a method runs", function() {
      // define a function for fn so that the following will pass
      expect(fn()).to.be('Yo, Rebecca!');
    });

    it("you should be able to alter multiple objects at once", function() {
      // define a function for fn so that the following will pass
      fn = function(greeting) {
        C.prototype.greeting = greeting;
      }

      var obj1 = new C('Rebecca'),
          obj2 = new C('Melissa'),
          greeting = "What's up";

      fn(greeting);

      expect(obj1.greeting).to.be(greeting);
      expect(obj2.greeting).to.be(greeting);
      expect(new C('Ellie').greeting).to.be(greeting);
    });

    it("you should be able to iterate over an object's 'own' properties", function() {
      // define a function for fn so that the following will pass
      fn = function(obj) {
        var arr = [];
        for(var k in obj) {
          if(obj.hasOwnProperty(k)) //whether it is the object's own property, but no prototype of the Class
            arr.push(k + ': ' + obj[k]);
        }

        return arr;
      }

      var C = function() {
        this.foo = 'bar';
        this.baz = 'bim';
      };

      C.prototype.bop = 'bip';

      var obj = new C();

      expect(fn(obj)).to.eql([ 'foo: bar', 'baz: bim' ]);
    });
  });
});
