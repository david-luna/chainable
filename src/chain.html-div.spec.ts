import { chainable, Chainable } from './chainable';

interface ValueExpected {
  value  : any;
  expect?: any;
}
interface ValueExpectedMap {
  [prop:string]: ValueExpected;
}


describe('chain with HTML div element', () => {

  // The elemento to 
  let elem   : HTMLDivElement;
  let chained: Chainable<HTMLDivElement>;

  beforeEach(() => {
    elem    = document.createElement('div');
    chained = chainable(elem);
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
    const keys: string[] = Object.keys(attrs);

    // Execute (use the chain to assign properties)
    let result: Chainable<HTMLElement> = keys.reduce((prev: Chainable<HTMLElement>, key: string) => {
      return prev[key](attrs[key].value);
    }, chained);

    // Expect
    expect(result).toBe(chained);
    keys.forEach(( key: string, index: number ) => {
      // The actual element has the value
      expect(elem[key]).toEqual(attrs[key].expect || attrs[key].value);
      // The value is also in the list of __values__
      expect(chained._getChainValueAt(index)).toEqual(attrs[key].value);
    });
    done();
  });

});
