# chaniablets

A script function that allows you to make method chaining for any object/API

[![GitHub license](https://img.shields.io/npm/l/chainablets.svg)](https://github.com/david-luna/chainable/blob/master/README.md)
[![Issues](https://img.shields.io/github/issues/david-luna/chainable.svg)](https://github.com/david-luna/chainable/issues)
[![Build Status](https://travis-ci.org/david-luna/chainable.svg?branch=master)](https://travis-ci.org/david-luna/chainable)
[![Coverage Status](https://coveralls.io/repos/github/david-luna/chainable/badge.svg)](https://coveralls.io/github/david-luna/chainable)
![Code Size](https://img.shields.io/bundlephobia/minzip/chainablets.svg)
![Weekly downloads](https://img.shields.io/npm/dw/chainablets.svg)

## Install

```bash
npm install --save chainablets
```

## Requirements

- This util is only supported in browsers which has the Proxy API.
- This util does not work with properties of type `any` but is expected to support them in future releases.
- This util makes use of TS generics and builtin types like `Parameters<T>` so Ts version 3.1.6+ is recommended.

## Usage

### Basic

```javascript
import { chainable } from 'chainablets';

// Make an object instance chainable by passing to the function
const elem    = document.createElement('a');
const chained = chainable(elem);

// Use original API but chaining methods
chained
  // Properties become getter/setter methods
  .id('my-anchor')
  .href('http://www.google.com')
  // You can also call the original API
  .setAttribute('disabled', 'true')
  .setAttribute('custom-attr', 'custom data')
  .getAttribute('target')

// You can get the original reference
console.assert(elem === chained._getChainReference());
// and also the return value of a certain call
console.assert(chained._getChainValueAt(4) === elem.target);
```

This lib also supports the following primitive types: number, string, boolean, Map, WeakMap, Set and Array. It's possible you may not get the proper param types for some Array functions. If you find one please file a bug.

```javascript
import { chainable } from 'chainablets';

const rawValue     = [1,2,3,4,5];
const chainedValue = chainable(rawValue);

chainedValue
.push(6)
.push(7)
.push(8)
.push(9)
.push(0)
.shift()
.pop()
.length()
.map((n) => n * 2)
.reduce((s: number, n: number) => s + n, 0)


console.assert(chainedValue._getChainReference() === rawValue);
console.assert(chainedValue._getChainValueAt(5) === 1);
console.assert(chainedValue._getChainValueAt(6) === 0);
console.assert(chainedValue._getChainValueAt(7) === 8);
console.log(chainedValue._getChainValueAt(8)); // [4,6,8,10,12,14,16,18]
console.assert(chainedValue._getChainValueAt(9) === 44);
```

Not tested in node yet but it might work too :)

### Strict mode

This utility has a `strict mode` by default. In strict mode any call to the chainable API of the object will throw an error if the source object does not have the property/method requested as own or as part of the prototype chain. For example the following code fails

```javascript
class MyClass {
  prop: string;
}
let c: Chainable<MyClass> = chainable(new MyClass());

c.prop('value') // TypeError: the property prop is not available
```

This happened because TypeScript (and I guess Babel too) do not set the property if it does not have a init value in the class definition or the constructor. So a 1st value must be set

```javascript
class MyClass {
  // this solves the TypeError
  prop: string = 'default';
  // this solves the TypeError too
  constructor (p: string) {
    this.prop = p;
  }
}
let c: Chainable<MyClass> = chainable(new MyClass());

c.prop('value') // this works
```

You can deactivate strict mode and reactivate whenever you want but is recommended to not change it at runtime. Strict mode is recommended.

```javascript
// Deactivate strict mode
chainable.prototype.strict = false;
// Do chainable stuff
// Activate strict mode again
chainable.prototype.strict = true;
```

## Known issues & limitations

- Does not work with the following primitives: symbol & functions since is meant to work with APIs and objects.
- Does not work with properties of type `any` giving compilation errors if you use them in your chains of methods.

## Release notes

### [0.4.0]

* Switch to JEST for testing
* Support for number, boolean and string primitives
* Chainable<T> generic type not exported explicitly
* Reduce size


### [0.3.2]

* TypeScript 4 support
* Added resolution of parameters for Array reduce method

### [0.3.1]

* Size optimization in final bundle (removing some tests files included in previous versions)
