import { chain, Chainable } from './chain';

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
  let chained: Chainable<HTMLDivElement>;

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
    let result: Chainable<HTMLElement> = Object.keys(attrs).reduce((prev: Chainable<HTMLElement>, key: string) => {
      return prev[key](attrs[key].value);
    }, chained);

    // Expect
    expect(result).toBe(chained);
    Object.keys(attrs).forEach((key: string) => {
      expect(elem[key]).toEqual(attrs[key].expect || attrs[key].value);
    });
    done();
  });

});
