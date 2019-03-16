import { chainable, Chainable } from './chainable';


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

    xit('should fail for private methods', done => {
      // Execute

      // Expect
      // This works (and not throws) because in JS there is not such thing as private
      // TypeScript will check and complain but at runtime the property of that
      // "private method" is there and we detect it
      expect(() => (<any>chained).priStringMethod()).toThrowError(TypeError);
      done();
    });

    it('should work with public properties already set', done => {
      // Preapare
      spyOn(rawValue, 'pubStringMethod').and.callThrough();

      // Execute
      chained
      .pubStringMethod('hello');

      // Expect
      expect(rawValue.pubStringMethod).toHaveBeenCalledWith('hello');
      expect(chained._getChainReference()).toBe(rawValue);
      done();
    });

    it('should fail for static properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chained).staticMethod).toThrowError(TypeError);
      done();
    });
    
    xit('should fail with properties which are not defined in the class', done => {
      // Prepare
      // If we define it at runtime we won get any error
      rawValue['unknownMethod'] = () => ``;

      // Expect
      // Custom properties
      expect(() => (<any>chained).unknownMethod).toThrowError(TypeError);
      done();
    });

  });

  // describe('class properties with strict mode OFF', () => {

  //   beforeEach(() => {
  //     chainable.prototype.strict = false;
  //   });
  //   afterEach(() => {
  //     chainable.prototype.strict = true;
  //   });

  //   it('should succed for private or non initialised public properties', done => {
  //     // Execute

  //     // Expect
  //     expect(() => (<any>chained).pubBooleanProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).pubNumberProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).pubStringProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).pubIfaceProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).pubClassProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).priBooleanProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).priNumberProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).priStringProp).not.toThrowError(TypeError);
  //     done();
  //   });

  //   it('should work with public properties already set', done => {
  //     // Preapare
  //     const ifaceVal: PropsInterface = { bol: true, num: 1, str: 'test' };
  //     const classVal: PropClass = new PropClass();
  //     rawValue.pubBooleanProp = false;
  //     rawValue.pubNumberProp  = 0;
  //     rawValue.pubStringProp  = '';
  //     rawValue.pubIfaceProp   = ifaceVal;
  //     rawValue.pubClassProp   = classVal;

  //     // Execute
  //     chained
  //     .pubBooleanProp(true)
  //     .pubNumberProp(1)
  //     .pubStringProp('test')
  //     .pubIfaceProp(ifaceVal)
  //     .pubClassProp(classVal)
  //     // .pubAnyProp({ val: 'test' })

  //     // Expect
  //     expect(rawValue.pubBooleanProp).toBe(true);
  //     expect(rawValue.pubNumberProp).toBe(1);
  //     expect(rawValue.pubStringProp).toBe('test');
  //     expect(rawValue.pubIfaceProp).toBe(ifaceVal);
  //     expect(rawValue.pubClassProp).toBe(classVal);
  //     // expect(rawValue.pubAnyProp).toEqual({ val: 'test' });
  //     expect(chained._getChainReference()).toBe(rawValue);
  //     done();
  //   });

  //   it('should work for static properties', done => {
  //     // Execute

  //     // Expect
  //     expect(() => (<any>chained).staticStringProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).staticNumberProp).not.toThrowError(TypeError);
  //     expect(() => (<any>chained).staticStringProp).not.toThrowError(TypeError);
  //     done();
  //   });
    
  //   it('should work with properties which are not defined in the class', done => {
  //     // Execute

  //     // Expect
  //     // Custom properties
  //     expect(() => (<any>chained).unknownProp).not.toThrowError(TypeError);
  //     done();
  //   });

  // });
});
