import { chainable, Chainable } from './chainable';

interface PropsInterface {
  str: string;
  num: number;
  bol: boolean;
}

class PropClass {
  strProp: string;
  numProp: number;
}

class TestPropsClass {
  // Static props
  static staticStringProp : string;
  static staticNumberProp : number;
  static staticBooleanProp: boolean;
  // Public props
  pubStringProp : string;
  pubNumberProp : number;
  pubBooleanProp: boolean;
  pubIfaceProp  : PropsInterface;
  pubClassProp  : PropClass;
  pubAnyProp    : any;
  // Private props
  private priStringProp : string;
  private priNumberProp : number;
  private priBooleanProp: boolean;
}


describe('chain with class properties', () => {

  let rawValue: TestPropsClass;
  let chained : Chainable<TestPropsClass>;

  beforeEach(() => {
    rawValue = new TestPropsClass();
    chained  = chainable<TestPropsClass>(rawValue);
  });
  afterEach(() => {
    rawValue = null;
    chained  = null;
  });


  describe('class properties with strict mode ON', () => {
    
    beforeEach(() => {
      chainable.prototype.strict = true;
    });
    afterEach(() => {
      chainable.prototype.strict = false;
    });

    it('should fail for private or non initialised public properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chained).pubBooleanProp).toThrowError(TypeError);
      expect(() => (<any>chained).pubNumberProp).toThrowError(TypeError);
      expect(() => (<any>chained).pubStringProp).toThrowError(TypeError);
      expect(() => (<any>chained).pubIfaceProp).toThrowError(TypeError);
      expect(() => (<any>chained).pubClassProp).toThrowError(TypeError);
      expect(() => (<any>chained).priBooleanProp).toThrowError(TypeError);
      expect(() => (<any>chained).priNumberProp).toThrowError(TypeError);
      expect(() => (<any>chained).priStringProp).toThrowError(TypeError);
      done();
    });

    it('should work with public properties already set', done => {
      // Preapare
      const ifaceVal: PropsInterface = { bol: true, num: 1, str: 'test' };
      const classVal: PropClass = new PropClass();
      rawValue.pubBooleanProp = false;
      rawValue.pubNumberProp  = 0;
      rawValue.pubStringProp  = '';
      rawValue.pubIfaceProp   = ifaceVal;
      rawValue.pubClassProp   = classVal;

      // Execute
      chained
      .pubBooleanProp(true)
      .pubNumberProp(1)
      .pubStringProp('test')
      .pubIfaceProp(ifaceVal)
      .pubClassProp(classVal)
      // .pubAnyProp({ val: 'test' })

      // Expect
      expect(rawValue.pubBooleanProp).toBe(true);
      expect(rawValue.pubNumberProp).toBe(1);
      expect(rawValue.pubStringProp).toBe('test');
      expect(rawValue.pubIfaceProp).toBe(ifaceVal);
      expect(rawValue.pubClassProp).toBe(classVal);
      // expect(rawValue.pubAnyProp).toEqual({ val: 'test' });
      expect(chained._getChainReference()).toBe(rawValue);
      done();
    });

    it('should fail for static properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chained).staticStringProp).toThrowError(TypeError);
      expect(() => (<any>chained).staticNumberProp).toThrowError(TypeError);
      expect(() => (<any>chained).staticStringProp).toThrowError(TypeError);
      done();
    });
    
    it('should fail with properties which are not defined in the class', done => {
      // Execute

      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownProp).toThrowError(TypeError);
      done();
    });

  });

  describe('class properties with strict mode OFF', () => {

    it('should succed for private or non initialised public properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chained).pubBooleanProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).pubNumberProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).pubStringProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).pubIfaceProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).pubClassProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).priBooleanProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).priNumberProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).priStringProp).not.toThrowError(TypeError);
      done();
    });

    it('should work with public properties already set', done => {
      // Preapare
      const ifaceVal: PropsInterface = { bol: true, num: 1, str: 'test' };
      const classVal: PropClass = new PropClass();
      rawValue.pubBooleanProp = false;
      rawValue.pubNumberProp  = 0;
      rawValue.pubStringProp  = '';
      rawValue.pubIfaceProp   = ifaceVal;
      rawValue.pubClassProp   = classVal;

      // Execute
      chained
      .pubBooleanProp(true)
      .pubNumberProp(1)
      .pubStringProp('test')
      .pubIfaceProp(ifaceVal)
      .pubClassProp(classVal)
      // .pubAnyProp({ val: 'test' })

      // Expect
      expect(rawValue.pubBooleanProp).toBe(true);
      expect(rawValue.pubNumberProp).toBe(1);
      expect(rawValue.pubStringProp).toBe('test');
      expect(rawValue.pubIfaceProp).toBe(ifaceVal);
      expect(rawValue.pubClassProp).toBe(classVal);
      // expect(rawValue.pubAnyProp).toEqual({ val: 'test' });
      expect(chained._getChainReference()).toBe(rawValue);
      done();
    });

    it('should work for static properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chained).staticStringProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).staticNumberProp).not.toThrowError(TypeError);
      expect(() => (<any>chained).staticStringProp).not.toThrowError(TypeError);
      done();
    });
    
    it('should work with properties which are not defined in the class', done => {
      // Execute

      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownProp).not.toThrowError(TypeError);
      done();
    });

  });
});
