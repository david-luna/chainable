import { chain, Chainable } from './chain';

class ParentClass {
  // Static props
  static staticStringProp : string;
  static staticNumberProp : number;
  static staticBooleanProp: boolean;
  // Public props
  public pubStringProp : string = '';
  public pubNumberProp : number = 0;
  public pubBooleanProp: boolean = false;
  // Private props
  private priStringProp : string;
  private priNumberProp : number;
  private priBooleanProp: boolean;
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
  private _childProp : any;
  public get childProp() : any {
    return this._childProp;
  }
  public set childProp(v : any) {
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
    chainedParent = chain<ParentClass>(parent);
    chainedChild  = chain<ChildClass>(child);
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
      .pubBooleanProp(true)
      .pubNumberProp(1)
      .pubStringProp('test');

      // Expect
      expect(parent.pubBooleanProp).toEqual(true);
      expect(parent.pubNumberProp).toEqual(1);
      expect(parent.pubStringProp).toEqual('test');
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
    
    it('should allow custom properties out of the type with "any" cast', done => {
      // Execute

      // Expect
      // This is the only way to bypass the linter
      // otherwise it complain as it must do
      // Static props in the instance
      expect((<any>chainedParent).staticStringProp).toBeDefined();
      expect((<any>chainedParent).staticNumberProp).toBeDefined();
      expect((<any>chainedParent).staticStringProp).toBeDefined();
      // Private props made public
      expect((<any>chainedParent).priBooleanProp).toBeDefined();
      expect((<any>chainedParent).priNumberProp).toBeDefined();
      expect((<any>chainedParent).priStringProp).toBeDefined();
      // Custom propoerties
      expect((<any>chainedParent).unknownProp).toBeDefined();
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
      .pubBooleanProp(true)
      .pubNumberProp(1)
      .pubStringProp('test')
      .childPubBooleanProp(false)
      .childPubNumberProp(2)
      .childPubStringProp('child test')

      // Expect
      expect(child.pubBooleanProp).toEqual(true);
      expect(child.pubNumberProp).toEqual(1);
      expect(child.pubStringProp).toEqual('test');
      expect(child.childPubBooleanProp).toEqual(false);
      expect(child.childPubNumberProp).toEqual(2);
      expect(child.childPubStringProp).toEqual('child test');
      done();
    });

    it('should work with get/set accessors', done => {
      // Execute
      chainedChild
      .prop('test')
      //.childProp('child test')

      // Expect
      expect(child.prop).toEqual('test');
      //expect(child.childProp).toEqual('child test');
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
