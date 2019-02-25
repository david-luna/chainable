# chaniablets

A script function that allows you to make method chainig for any object/API

[![Build Status](https://travis-ci.org/david-luna/chainable.svg?branch=master)](https://travis-ci.org/david-luna/chainable)

## Install

```bash
npm install --save chainablejs
```

## Usage

```javascript
// Typescript
import { chainable } from 'chainablets';

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



```