import { chainable, Chainable } from './chainable';

interface ValueExpected {
  value  : any;
  expect?: any;
}
interface ValueExpectedMap {
  [prop:string]: ValueExpected;
}


describe('chain with HTML Anchor element', () => {

  // The elemento to 
  let elem   : HTMLAnchorElement;
  let chained: Chainable<HTMLElement>;

  beforeEach(() => {
    elem    = document.createElement('a');
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
      href  : { value: 'http://www.google.com/' },
      target: { value: '_blank' },
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
