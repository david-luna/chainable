import { chain, Chainable } from './chain';

class ParentClass {
  // Static props
  static  staticStringProp : string;
  static  staticNumberProp : number;
  static  staticBooleanProp: boolean;
  // Public props
  public pubStringProp : string = '';
  public pubNumberProp : number = 0;
  public pubBooleanProp: boolean = false;
  // Private props
  private priStringProp : string;
  private priNumberProp : number;
  private priBooleanProp: boolean;
  // Get & Set
  private _prop : any;
  public get prop() : any {
    return this._prop;
  }
  public set prop(v : any) {
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
      done();
    });

    it('should work with get/set accessors', done => {
      // Execute
      chainedParent
      .prop('test')

      // Expect
      expect(parent.prop).toEqual('test');
      done();
    });
    
    it('should noty work with static attributes', done => {
      // Execute

      // Expect
      expect((<any>chainedParent).staticStringProp).not.toBeDefined();
      expect((<any>chainedParent).staticNumberProp).not.toBeDefined();
      expect((<any>chainedParent).staticStringProp).not.toBeDefined();
      done();
    });

    it('should noty work with private attributes', done => {
      // Execute

      // Expect
      expect((<any>chainedParent).priBooleanProp).not.toBeDefined();
      expect((<any>chainedParent).priNumberProp).not.toBeDefined();
      expect((<any>chainedParent).priStringProp).not.toBeDefined();
      done();
    });
  });

  describe('instance of a class with inheritance', () => {

    it('should work with public attributes already set', done => {
      // Execute
      chainedChild
      .pubBooleanProp(true)
      .pubNumberProp(1)
      .pubStringProp('test');

      // Expect
      expect(child.pubBooleanProp).toEqual(true);
      expect(child.pubNumberProp).toEqual(1);
      expect(child.pubStringProp).toEqual('test');
      done();
    });

    it('should work with get/set accessors', done => {
      // Execute
      chainedChild
      .prop('test')

      // Expect
      expect(child.prop).toEqual('test');
      done();
    });
    
    it('should noty work with static attributes', done => {
      // Execute

      // Expect
      expect((<any>chainedChild).staticStringProp).not.toBeDefined();
      expect((<any>chainedChild).staticNumberProp).not.toBeDefined();
      expect((<any>chainedChild).staticStringProp).not.toBeDefined();
      done();
    });

    it('should noty work with private attributes', done => {
      // Execute

      // Expect
      expect((<any>chainedChild).priBooleanProp).not.toBeDefined();
      expect((<any>chainedChild).priNumberProp).not.toBeDefined();
      expect((<any>chainedChild).priStringProp).not.toBeDefined();
      done();
    });
  });

  
});
