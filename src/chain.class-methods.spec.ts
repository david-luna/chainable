import { Chainable } from './types';
import { chainable } from './chainable';

class TestMethodsClass {
  // Static method
  static staticMethod  ( val: string ): void {}
  // Public method
  pubStringMethod(input: string) : string { return `yell ${input}`; }
  // Private method
  private priStringMethod(input: string): string { return `whisper ${input}`; }
}


describe('chain with class properties', () => {

  let rawValue: TestMethodsClass;
  let chained : Chainable<TestMethodsClass>;

  beforeEach(() => {
    rawValue = new TestMethodsClass();
    chained  = chainable<TestMethodsClass>(rawValue);
  });
  afterEach(() => {
    rawValue = null;
    chained  = null;
  });


  describe('class methods with strict mode ON', () => {

    it('should fail for static methods', () => {
      // Execute

      // Expect
      expect(() => (<any>chained).staticMethod).toThrowError(TypeError);
    });

    it('should work with public methods', () => {
      // Prepare
      spyOn(rawValue, 'pubStringMethod').and.callThrough();

      // Execute
      chained
      .pubStringMethod('hello');

      // Expect
      expect(rawValue.pubStringMethod).toHaveBeenCalledWith('hello');
      expect(chained._getChainReference()).toBe(rawValue);
    });

    it('should pass for private methods', () => {
      // Prepare
      spyOn(rawValue, <any>'priStringMethod').and.callThrough();
      // Execute

      // Expect
      // This works (and not throws) because in JS there is not such thing as private
      // TypeScript will check and complain but at runtime the property of that
      // "private method" is there and we detect it
      expect(() => (<any>chained).priStringMethod('hello')).not.toThrowError(TypeError);
      expect((<any>rawValue).priStringMethod).toHaveBeenCalledWith('hello');
    });

    it('should fail for methods which are not defined in the class', () => {
      // Prepare
      
      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownMethod()).toThrowError(TypeError);
    });
    
    it('should pass for methods which are not defined in the class', () => {
      // Prepare
      // If we define it at runtime we wont get any error
      rawValue['unknownMethod'] = () => 'unknownResult';
      spyOn(rawValue, <any>'unknownMethod').and.callThrough();

      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownMethod()).not.toThrowError(TypeError);
      expect(chained._getChainValueAt(0)).toEqual('unknownResult')
    });
  });

  describe('class methods with strict mode OFF', () => {
    beforeEach(() => {
      chainable.prototype.strict = false;
    });
    afterEach(() => {
      chainable.prototype.strict = true;
    });

    it('should pass for static methods', () => {
      // Execute

      // Expect
      expect(() => (<any>chained).staticMethod()).not.toThrowError(TypeError);
    });
    
    it('should pass for methods which are not defined in the class', () => {
      // Prepare
      // If we define it at runtime we wont get any error
      rawValue['unknownMethod'] = () => 'unknownResult';
      spyOn(rawValue, <any>'unknownMethod').and.callThrough();

      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownMethod()).not.toThrowError(TypeError);
      expect(chained._getChainValueAt(0)).toEqual('unknownResult')
    });
  });
});
