import { Chainable } from './types';
import { chainable } from './chainable';


interface GetSetInterface {
  str: string;
  num: number;
  bol: boolean;
}

class GetSetClass {
  strProp: string;
  numProp: number;
}

class TestGetSetClass {
  private _anyProp : any;
  get anyProp() : any {
    return this._anyProp;
  }
  set anyProp(v : any) {
    this._anyProp = v;
  }
  private _strProp : string;
  get strProp() : string {
    return this._strProp;
  }
  set strProp(v : string) {
    this._strProp = v;
  }
  private _numProp : number;
  get numProp() : number {
    return this._numProp;
  }
  set numProp(v : number) {
    this._numProp = v;
  }
  private _boolProp : boolean;
  get boolProp() : boolean {
    return this._boolProp;
  }
  set boolProp(v : boolean) {
    this._boolProp = v;
  }
  private _ifaceProp : GetSetInterface;
  get ifaceProp() : GetSetInterface {
    return this._ifaceProp;
  }
  set ifaceProp(v : GetSetInterface) {
    this._ifaceProp = v;
  }
  private _classProp : GetSetClass;
  get classProp() : GetSetClass {
    return this._classProp;
  }
  set classProp(v : GetSetClass) {
    this._classProp = v;
  }
}

describe('chainable with class properties', () => {

  let rawValue: TestGetSetClass;
  let chained : Chainable<TestGetSetClass>;

  beforeEach(() => {
    rawValue = new TestGetSetClass();
    chained  = chainable(rawValue);
  });
  afterEach(() => {
    rawValue = null;
    chained  = null;
  });


  describe('class getters/setters with strict mode ON', () => {

    it('should work with setter functions', () => {
      // Prepare
      const ifaceVal: GetSetInterface = { bol: true, num: 1, str: 'test' };
      const classVal: GetSetClass = new GetSetClass();
      const anyObject = { anyKey: 'anyValue' };

      // Execute
      chained
      .anyProp(anyObject)
      .boolProp(true)
      .numProp(1)
      .strProp('test')
      .ifaceProp(ifaceVal)
      .classProp(classVal)

      // Expect
      expect(rawValue.anyProp).toBe(anyObject);
      expect(rawValue.boolProp).toBe(true);
      expect(rawValue.numProp).toBe(1);
      expect(rawValue.strProp).toBe('test');
      expect(rawValue.ifaceProp).toBe(ifaceVal);
      expect(rawValue.classProp).toBe(classVal);
      expect(chained._getChainReference()).toBe(rawValue);
    });
  });
});
