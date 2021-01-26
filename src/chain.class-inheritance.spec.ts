import { Chainable } from './types';
import { chainable } from './chainable';

class TestInheritClass {
  public parentStrProp: string;
  private _parentNumProp : number;
  get parentNumProp() : number {
    return this._parentNumProp;
  }
  set parentNumProp(v : number) {
    this._parentNumProp = v;
  }
  public parentStrMethod( s: string ): string {
    return `parentStrMethod("${s}")`;
  }
}

class TestInheritChildClass extends TestInheritClass {
  public childStrProp: string;
  private _childNumProp : number;
  get childNumProp() : number {
    return this._childNumProp;
  }
  set childNumProp(v : number) {
    this._childNumProp = v;
  }
  public childStrMethod( s: string ): string {
    return `childStrMethod("${s}")`;
  }
}

describe('chainable with properties & method inheritance', () => {

  let rawValue: TestInheritChildClass;
  let chained : Chainable<TestInheritChildClass>;

  beforeEach(() => {
    rawValue = new TestInheritChildClass();
    chained  = chainable(rawValue);
  });
  afterEach(() => {
    rawValue = null;
    chained  = null;
  });


  describe('class inheritance with strict mode ON', () => {

    it('should work with inherited props and methods', done => {
      // Prepare (to avoid runtime error)
      rawValue.parentStrProp = '';
      rawValue.childStrProp  = '';
      
      // Execute inherited & own methods
      chained
      .parentStrProp('parent')
      .parentNumProp(0)
      .parentStrMethod('parent')
      .childStrProp('child')
      .childNumProp(1)
      .childStrMethod('child')

      // Expect
      expect(rawValue.parentStrProp).toEqual('parent');
      expect(rawValue.parentNumProp).toEqual(0);
      expect(chained._getChainValueAt(2)).toEqual('parentStrMethod("parent")');
      expect(rawValue.childStrProp).toEqual('child');
      expect(rawValue.childNumProp).toEqual(1);
      expect(chained._getChainValueAt(5)).toEqual('childStrMethod("child")');
      expect(chained._getChainReference()).toBe(rawValue);
      done();
    });

  });

  describe('class inheritance with strict mode OFF', () => {
    beforeEach(() => {
      chainable.prototype.strict = false;
    });
    afterEach(() => {
      chainable.prototype.strict = true;
    });

    it('should work with inherited props and methods', done => {
      // Execute inherited & own methods
      chained
      .parentStrProp('parent')
      .parentNumProp(0)
      .parentStrMethod('parent')
      .childStrProp('child')
      .childNumProp(1)
      .childStrMethod('child')

      // Expect
      expect(rawValue.parentStrProp).toEqual('parent');
      expect(rawValue.parentNumProp).toEqual(0);
      expect(chained._getChainValueAt(2)).toEqual('parentStrMethod("parent")');
      expect(rawValue.childStrProp).toEqual('child');
      expect(rawValue.childNumProp).toEqual(1);
      expect(chained._getChainValueAt(5)).toEqual('childStrMethod("child")');
      expect(chained._getChainReference()).toBe(rawValue);
      done();
    });

  });
  
});
