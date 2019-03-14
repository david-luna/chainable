# chaniablets

A script function that allows you to make method chainig for any object/API

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

## Usage

```javascript
// Typescript
import { chainable, Chainable } from 'chainablets';

let elem   : HTMLAnchorElement;
let chained: Chainable<HTMLAnchorElement>;

// Make an object instance chainable by passing to the function
elem    = document.createElement('a');
chained = chainable(elem);

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

For JS just remove typings only import the method
```javascript
// JavaScript
const chainable = require('chainablets');

// Make an object instance chainable by passing to the function
let elem    = document.createElement('a');
let chained = chainable(elem);

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

Not tested in node yet but it might work too :)

## Known issues & limitations

- Does not work with primitives (boolean, string, number, symbol) or funcitons since is meant to work with APIs and objects.
- Does not work with properties of type `any` giving compilation errors if you use them in your chains of nethods.
- Does not work with arrays in TypeScript projects giving a compilation error due to bad resolving of the Array API. Although you can cast the chainable to the `any` type and it will work properly but without the type checking and autocompletion (not recommended). Find the sample below

```javascript
// Typescript
import { chainable, Chainable } from 'chainablets';

// Prepare
const rawValue          = [1,2,3,4,5];
const chainedValue: any = chainable(rawValue);

// Execute
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
.reduce((s,n) => s + n)


console.assert(chainedValue._getChainReference() === rawValue);
console.assert(chainedValue._getChainValueAt(5) === 1);
console.assert(chainedValue._getChainValueAt(6) === 0);
console.assert(chainedValue._getChainValueAt(7) === 8);
console.assert(chainedValue._getChainValueAt(8) === [4,6,8,10,12,14,16,18]);
console.assert(chainedValue._getChainValueAt(9) === 44);
```
