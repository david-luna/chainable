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

  describe('function type', () => {

    it('should resolve all interface types properly ', done => {
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
