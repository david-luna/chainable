import { chain, Chain } from './chain';

interface ValueExpected {
  value  : any;
  expect?: any;
}
interface ValueExpectedMap {
  [prop:string]: ValueExpected;
}


describe('chain with HTML element', () => {

  // The elemento to 
  let elem   : HTMLDivElement;
  let chained: Chain<HTMLElement>;

  beforeEach(() => {
    elem    = document.createElement('div');
    chained = chain(elem);
  });

  afterEach(() => {
    elem    = null;
    chained = null;
  });

  it('should let change the attibutes of the element', done => {
    // We're going to test core HTML attibutes specified in
    // https://www.w3.org/TR/2010/WD-html-markup-20100624/common-attributes.html
    const attrs: ValueExpectedMap = {
      accessKey      : { value: 'e' },
      className      : { value: 'elem-class' },
      contentEditable: { value: 'true' },
      dir            : { value: 'rtl' },
      draggable      : { value: 'true', expect: true },
      hidden         : { value: 'hidden', expect: true },
      id             : { value: 'elem-id' },
      lang           : { value: 'es-ES' },
      spellcheck     : { value: 'true', expect: true },
      //style          : { value: 'background-color: red;', expect: { backgroundColor: 'red' } },
      tabIndex       : { value: '1', expect: 1 },
      title          : { value: 'elem-title' },
    };

    // Execute (use the chain to assign properties)
    let result: Chain<HTMLElement> = Object.keys(attrs).reduce((prev: Chain<HTMLElement>, key: string) => {
      return prev[key](attrs[key].value);
    }, chained);

    // Expect
    expect(result).toBe(chained);
    Object.keys(attrs).forEach((key: string) => {
      expect(elem[key]).toEqual(attrs[key].expect || attrs[key].value);
    });
    done();
  });

  xdescribe('Storage APIs', () => {

    it('should work with localStorage', done => {
      // Prepare
      let data: {[attr: string]: string} = {
        localkey1: 'value1',
        localkey2: 'value2',
        localkey3: 'value3',
        localkey4: 'value4',
      };

      // Execute
      let result: Chain<Storage> = chain(localStorage);
      for ( let a in data ) {
        result = result.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(localStorage.getItem(a)).toBe(data[a]);
      }
      done();
    });

    it('should work with sessionStorage', done => {
      // Prepare
      let data: {[attr: string]: string} = {
        sessionkey1: 'value1',
        sessionkey2: 'value2',
        sessionkey3: 'value3',
        sessionkey4: 'value4',
      };

      // Execute
      let result: Chain<Storage> = chain(sessionStorage);
      for ( let a in data ) {
        result = result.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(sessionStorage.getItem(a)).toBe(data[a]);
      }
      done();
    });

  });
});
