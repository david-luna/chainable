import { chain, Chain } from './chain';


class ParentClass {
  // Public props
  public  pubStringProp : string;
  public  pubNumberProp : number;
  public  pubBooleanProp: boolean;
  // Private props
  private priStringProp : string;
  private priNumberProp : number;
  private priBooleanProp: boolean;
  // Setters
  public stringSetter  ( val: string ): void { this.priStringProp = val }
  public numberSetter  ( val: number ): void { this.priNumberProp = val }
  public booleanSetter ( val: boolean): void { this.priBooleanProp = val }
  // Getters
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

  beforeEach(() => {
    parent = new ParentClass();
    child  = new ChildClass();
  });
  afterEach(() => {
    parent = null;
    child  = null;
  });


  describe('instance of a class', () => {

    // Prepare
    
    let storage: Chain<Storage> = chain(localStorage);
    let data: {[attr: string]: string} = {
      localkey1: 'value1',
      localkey2: 'value2',
      localkey3: 'value3',
      localkey4: 'value4',
    };

    it('should work with setItem', done => {
      // Execute
      for ( let a in data ) {
        storage = storage.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(localStorage.getItem(a)).toBe(data[a]);
      }
      done();
    });

    it('should work with removeItem', done => {
      // Execute
      for ( let a in data ) {
        storage = storage.removeItem(a);
      }

      // Expect
      for ( let a in data ) {
        expect(localStorage.getItem(a)).toEqual(null);
      }
      expect(localStorage.length).toEqual(0);
      done();
    });
  });

  describe('Session Storage', () => {
    // Prepare
    let storage: Chain<Storage> = chain(sessionStorage);
    let data: {[attr: string]: string} = {
      sessionkey1: 'value1',
      sessionkey2: 'value2',
      sessionkey3: 'value3',
      sessionkey4: 'value4',
    };
    
    it('should work with setItem', done => {
      // Execute
      for ( let a in data ) {
        storage = storage.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(sessionStorage.getItem(a)).toBe(data[a]);
      }
      done();
    });

    it('should work with removeItem', done => {
      // Execute
      for ( let a in data ) {
        storage = storage.removeItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(sessionStorage.getItem(a)).toEqual(null);
      }
      expect(sessionStorage.length).toEqual(0);
      done();
    });

  });
});
