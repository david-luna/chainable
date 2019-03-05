import { chainable, Chainable } from './chainable';

describe('chain with js types', () => {

  describe('string type', () => {

    it('should resolve all interface types properly with the primitive', done => {
      // Prepare
      const rawValue     = 'hello world';
      const chainedValue = chainable<String>(rawValue);

      // Execute
      chainedValue
      .toUpperCase()
      .replace('hello', 'goodbye');
      

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe('HELLO WORLD');
      expect(chainedValue._getChainValueAt(1)).toBe('goodbye world');
      done();
    });

    it('should resolve all interface types properly with the String object', done => {
      // Prepare
      const rawValue     = new String('hello world');
      const chainedValue = chainable(rawValue);

      // Execute
      chainedValue
      .toUpperCase()
      .replace('hello', 'goodbye');
      

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe('HELLO WORLD');
      expect(chainedValue._getChainValueAt(1)).toBe('goodbye world');
      done();
    });

  });

  describe('number type', () => {

    it('should resolve all interface types properly with the primitive', done => {
      // Prepare
      const rawValue     = 1;
      const chainedValue = chainable<Number>(rawValue);

      // Execute
      chainedValue
      .toExponential(2)
      .toFixed(2)
      .toPrecision(2)

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe((1).toExponential(2));
      expect(chainedValue._getChainValueAt(1)).toBe((1).toFixed(2));
      expect(chainedValue._getChainValueAt(2)).toBe((1).toPrecision(2));
      done();
    });

    it('should resolve all interface types properly with the Number object', done => {
      // Prepare
      const rawValue     = new Number(1);
      const chainedValue = chainable<Number>(rawValue);

      // Execute
      chainedValue
      .toExponential(2)
      .toFixed(2)
      .toPrecision(2)

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe((1).toExponential(2));
      expect(chainedValue._getChainValueAt(1)).toBe((1).toFixed(2));
      expect(chainedValue._getChainValueAt(2)).toBe((1).toPrecision(2));
      done();
    });

  });

  describe('number type', () => {

    it('should resolve all interface types properly with the primitive', done => {
      // Prepare
      const rawValue     = true;
      const chainedValue = chainable<Boolean>(rawValue);

      // Execute
      chainedValue
      .valueOf()

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe(true);
      done();
    });

    it('should resolve all interface types properly with the Boolean object', done => {
      // Prepare
      const rawValue     = new Boolean(true);
      const chainedValue = chainable<Boolean>(rawValue);

      // Execute
      chainedValue
      .valueOf()

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe(true);
      done();
    });

  });

  describe('Map type', () => {

    it('should resolve all interface types properly with the primitive', done => {
      // Prepare
      const rawValue     = new Map();
      const chainedValue = chainable<Map<string, string>>(rawValue);

      // Execute
      chainedValue
      .set('key1', 'val1')
      .set('key2', 'val2')
      .set('key3', 'val3')
      .size()
      .get('key1')
      .keys()
      .values()

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(3)).toEqual(3);
      expect(chainedValue._getChainValueAt(4)).toEqual('val1');
      expect(chainedValue._getChainValueAt(5)).toEqual(rawValue.keys());
      expect(chainedValue._getChainValueAt(6)).toEqual(rawValue.values());
      done();
    });

  });

  // Generics has a problem here resolving the signature of push/pop and other APIs from Array
  describe('array type', () => {

    it('should resolve all interface types properly with the primitive', done => {
      // Prepare
      const rawValue     = [1,2,3,4,5];
      const chainedValue = chainable<number[]>(rawValue);

      // Execute
      chainedValue
      .pop()

      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe(5);
      done();
    });

  });

  // TODO: there are some issues here
  // because chainable recreates the API setting the scope to the source object
  // also the proxy API doe not return an object if we apply it on a function
    
  xdescribe('function type', () => {

    it('should allow bind functions ', done => {
      // Prepare
      const rawValue     = () => `val ${this.prop}`;
      const chainedValue = chainable<Function>(rawValue);

      // Execute
      chainedValue
      .bind({ prop: 'scope1' })
      .bind({ prop: 'scope2' })


      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)()).toEqual('val scope1');
      expect(chainedValue._getChainValueAt(1)()).toEqual('val scope2');
      done();
    });

    it('should allow apply/call functions ', done => {
      // Prepare
      const rawValue     = (msg) => console.log(`val ${this.prop}: ${msg}`);
      const chainedValue = chainable<Function>(rawValue);
      // Spy
      spyOn(console, 'log');

      // Execute
      chainedValue
      .apply({ prop: 'scope1' }, ['message 1'])
      .call({ prop: 'scope2' }, 'message 2')


      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)()).toEqual('val scope1: message 1');
      expect(chainedValue._getChainValueAt(1)()).toEqual('val scope2: message 2');
      done();
    });

  });

  xdescribe('array type', () => {

    it('should resolve all interface types properly ', done => {
      // Prepare
      const rawValue     = [1,2,3,4];
      const chainedValue = chainable<Number[]>(rawValue);

      // Execute
      chainedValue
      // TODO: this is not resolving properly
      // .push(5)



      // Expect
      expect(chainedValue._getChainReference()).toBe(rawValue);
      expect(chainedValue._getChainValueAt(0)).toBe(true);
      done();
    });

  });
});
