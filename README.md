# chaniablets

A script function that allows you to make method chainig for any object/API

[![Build Status](https://travis-ci.org/david-luna/chainable.svg?branch=master)](https://travis-ci.org/david-luna/chainable)
[![Coverage Status](https://coveralls.io/repos/github/david-luna/chainable/badge.svg)](https://coveralls.io/github/david-luna/chainable)

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

## Known issues

- Bad type resolution for arrays: although it works at runtime the type definition is not clear enough for TS and does not resolve the type corrctly
- Not working on functions: this lib was meant to work only with objects but it would be a nice to have
