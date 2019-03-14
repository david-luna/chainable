import { chainable, Chainable } from './chainable';

class ParentClass {
  // Static props
  static staticStringProp : string;
  static staticNumberProp : number;
  static staticBooleanProp: boolean;
  // Public props
  public pubStringProp        : string;
  public pubNumberProp        : number;
  public pubBooleanProp       : boolean;
  public pubAnyProp           : any;
  public pubStringPropWithVal : string = '';
  public pubNumberPropWithVal : number = 0;
  public pubBooleanPropWithVal: boolean = false;
  public pubAnyPropWithVal    : any = {};
  // Private props
  private priStringProp        : string;
  private priNumberProp        : number;
  private priBooleanProp       : boolean;
  private priStringPropWithVal : string  = '';
  private priNumberPropWithVal : number  = 0;
  private priBooleanPropWithVal: boolean = false;
  // Get & Set
  private _prop : string;
  public get prop() : string {
    return this._prop;
  }
  public set prop(v : string) {
    this._prop = v;
  }
  
  // Setter Methods
  public stringSetter  ( val: string ): void { this.priStringProp = val }
  public numberSetter  ( val: number ): void { this.priNumberProp = val }
  public booleanSetter ( val: boolean): void { this.priBooleanProp = val }
  // Getter Methods
  public stringGetter  ( ): string  { return this.priStringProp }
  public numberGetter  ( ): number  { return this.priNumberProp }
  public booleanGetter ( ): boolean { return this.priBooleanProp }
  // Other methods
  public stringMethod  ( param1: any ): string  { return ``;   }
  public numberMethod  ( param1: any ): number  { return 0;    }
  public booleanMethod ( param1: any ): boolean { return true; }
  public arrayMethod   ( param1: any ): any[]   { return [];   }
}

class ChildClass extends ParentClass {
  // Public props
  public childPubStringProp : string = '';
  public childPubNumberProp : number = 0;
  public childPubBooleanProp: boolean = false;
  // Get & Set
  private _childProp : object;
  public get childProp() : object {
    return this._childProp;
  }
  public set childProp(v : object) {
    this._childProp = v;
  }
  // Other methods
  public childStringMethod  ( param1: any ): string  { return ``;   }
  public childNumberMethod  ( param1: any ): number  { return 0;    }
  public childBooleanMethod ( param1: any ): boolean { return true; }
  public childArrayMethod   ( param1: any ): any[]   { return [];   }

}

describe('chain with classes and inheritance', () => {

  let parent: ParentClass;
  let child : ChildClass;
  let chainedParent: Chainable<ParentClass>;
  let chainedChild : Chainable<ChildClass>;

  beforeEach(() => {
    parent = new ParentClass();
    child  = new ChildClass();
    chainedParent = chainable<ParentClass>(parent);
    chainedChild  = chainable<ChildClass>(child);
  });
  afterEach(() => {
    parent = null;
    child  = null;
    chainedParent = null;
    chainedChild  = null;
  });


  describe('instance of a class', () => {

    it('should work with public attributes already set', done => {
      // Execute
      chainedParent
      .pubBooleanPropWithVal(true)
      .pubNumberPropWithVal(1)
      .pubStringPropWithVal('test')
      // .pubAnyPropWithVal({ val: 'test' })

      // Expect
      expect(parent.pubBooleanPropWithVal).toEqual(true);
      expect(parent.pubNumberPropWithVal).toEqual(1);
      expect(parent.pubStringPropWithVal).toEqual('test');
      // expect(parent.pubAnyPropWithVal).toEqual({ val: 'test' });
      expect(chainedParent._getChainReference()).toBe(parent);
      done();
    });

    it('should work with get/set accessors', done => {
      // Execute
      chainedParent
      .prop('test')

      // Expect
      expect(parent.prop).toEqual('test');
      expect(chainedParent._getChainReference()).toBe(parent);
      done();
    });

    it('should fail for static properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chainedParent).staticStringProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).staticNumberProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).staticStringProp).toThrowError(TypeError);
      done();
    });

    it('should fail for private/public non initialised properties', done => {
      // Execute

      // Expect
      expect(() => (<any>chainedParent).pubBooleanProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).pubNumberProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).pubStringProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).priBooleanProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).priNumberProp).toThrowError(TypeError);
      expect(() => (<any>chainedParent).priStringProp).toThrowError(TypeError);
      done();
    });
    
    it('should fail with properties which are not defined in the class', done => {
      // Execute

      // Expect
      // Custom properties
      expect(() => (<any>chainedParent).unknownProp).toThrowError(TypeError);
      done();
    });

    it('should work with public methods', done => {
      // Execute

      // Expect
      expect(() => {
        chainedParent
        .booleanMethod(true)
        .numberMethod(1)
        .stringMethod('test');
      }).not.toThrow();
      expect(chainedParent._getChainReference()).toBe(parent);
      done();
    });

  });

  describe('instance of a class with inheritance', () => {

    it('should work with public attributes already set', done => {
      // Execute
      chainedChild
      .pubBooleanPropWithVal(true)
      .pubNumberPropWithVal(1)
      .pubStringPropWithVal('test')
      .childPubBooleanProp(false)
      .childPubNumberProp(2)
      .childPubStringProp('child test')

      // Expect
      expect(child.pubBooleanPropWithVal).toEqual(true);
      expect(child.pubNumberPropWithVal).toEqual(1);
      expect(child.pubStringPropWithVal).toEqual('test');
      expect(child.childPubBooleanProp).toEqual(false);
      expect(child.childPubNumberProp).toEqual(2);
      expect(child.childPubStringProp).toEqual('child test');
      done();
    });

    it('should work with get/set accessors', done => {
      // Execute
      chainedChild
      .prop('test')
      .childProp({})
      
      // Expect
      expect(child.prop).toEqual('test');
      expect(child.childProp).toEqual({});
      done();
    });

    it('should work with public methods', done => {
      // Execute

      // Expect
      expect(() => {
        chainedChild
        .booleanMethod(true)
        .numberMethod(1)
        .stringMethod('test')
        .childBooleanMethod(true)
        .childNumberMethod(1)
        .childStringMethod('test')
      }).not.toThrow();
      expect(chainedChild._getChainReference()).toBe(child);
      done();
    });
    
  });
});
