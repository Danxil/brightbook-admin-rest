# JSKlass

![Build Status](https://img.shields.io/travis/ghaiklor/jsklass.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/jsklass.svg) ![Downloads](https://img.shields.io/npm/dm/jsklass.svg) ![npm version](https://img.shields.io/npm/v/jsklass.svg) ![dependencies](https://img.shields.io/david/ghaiklor/jsklass.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/jsklass.svg) ![License](https://img.shields.io/npm/l/jsklass.svg)

Create classes with prototype object, static properties and mixins in JavaScript.

## Getting Started

Install `jsklass` module.

```shell
npm install jsklass
```

Include ```jsklass``` and you can start work with it.

```javascript
var Class = require('jsklass');

var Basic = Class.create();
var Extended = Basic.extend();
```

For example, you can create Animal class and extend it with Cat class.

```javascript
var Animal = Class.create({
    init: function() {
        this.type = "Animal";
    },

    getType: function() {
        return this.type;
    }
});

var Cat = Animal.extend({
    init: function() {
        this.type = "Cat";
    }
});

var justAnimal = new Animal();
justAnimal.getType(); // Animal

var justCat = new Cat();
justCat.getType(); // Cat
```

## API

API has simple method. When you create Class you call `create` method of Class object.

If you want extends then call `extend` in existing class.

```javascript
var result = Class.create(prototype, staticProperties, [mixinsArray]);
result.extend(prototype, staticProperties, [mixinsArray]);
```

## Examples

Working example you can find [here](./examples).

### Basic creating and extending

```javascript
var BasicClass = Class.create(); // BasicClass -> Object
var ExtendedClass = BasicClass.extend(); // ExtendedClass -> BasicClass -> Object
var MoreExtendedClass = ExtendedClass.extend(); // MoreExtendedClass -> ExtendedClass -> BasicClass -> Object
```

### Creating classes with methods and attributes and extend them

```javascript
var Class = require('../');

var BasicClass = Class.create({
    type: "Basic",

    init: function () {
        this.foo = "bar";
    },

    getType: function () {
        return this.type;
    }
});

var ExtendedClass = BasicClass.extend({
    type: "ExtendedClass",

    init: function () {
        this.bar = "foo";
    }
});

var MoreClass = BasicClass.extend({
    type: "MoreClass"
});

var basic = new BasicClass();
console.log(basic.getType()); // Basic
console.log(basic.foo); // bar

var extended = new ExtendedClass();
console.log(extended.getType()); // ExtendedClass
console.log(extended.foo); // undefined
console.log(extended.bar); // foo

var more = new MoreClass();
console.log(more.getType()); // MoreClass
console.log(more.foo); // bar
console.log(more.bar); // undefined
```

### Creating classes with prototype and static methods

```javascript
var BasicClass = Class.create({}, {
    staticFoo: 'bar'
});

var ExtendedClass = BasicClass.extend({}, {
    staticBar: 'foo'
});

console.log(BasicClass.staticFoo); // bar
console.log(BasicClass.staticBar); // undefined

console.log(ExtendedClass.staticFoo); // undefined
console.log(ExtendedClass.staticBar); // foo
```

### Creating classes with prototype, static and mixins

```javascript
var Class = require('../');

var EventEmitterMixin = {
    on: function () {
        return "on";
    },

    off: function () {
        return "off";
    },

    emit: function () {
        return "emit";
    }
};

var OtherMixin = {
    other: function () {
        return "Other";
    }
};

var EventEmitter = Class.create({}, {}, [EventEmitterMixin]);
var EventEmitterAndOther = Class.create({}, {}, [EventEmitterMixin, OtherMixin]);

var event = new EventEmitter();
console.log(event.on()); // on
console.log(event.off()); // off
console.log(event.emit()); // emit
console.log(event.other); // undefined

var otherEvent = new EventEmitterAndOther();
console.log(otherEvent.on()); // on
console.log(otherEvent.off()); // off
console.log(otherEvent.emit()); // emit
console.log(otherEvent.other()); // Other
```

## License

The MIT License (MIT)

Copyright © 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
