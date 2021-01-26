import { Chainable } from './types';
import { chainable } from './chainable';

interface ValueExpected {
  value  : any;
  expect?: any;
}
interface ValueExpectedMap {
  [prop:string]: ValueExpected;
}


describe('chain with HTML Anchor element', () => {

  // The element to 
  let elem   : HTMLAnchorElement;
  let chained: Chainable<HTMLAnchorElement>;

  beforeEach(() => {
    elem    = document.createElement('a');
    chained = chainable(elem);
  });

  afterEach(() => {
    elem    = null;
    chained = null;
  });

  it('should let change the attributes of the element', () => {
    // We're going to test core HTML attributes specified in
    // https://www.w3.org/TR/2010/WD-html-markup-20100624/common-attributes.html
    const attrs: ValueExpectedMap = {
      href  : { value: 'http://www.google.com/' },
      target: { value: '_blank' },
    };
    const keys = Object.keys(attrs);

    // Execute (use the chain to assign properties)
    keys.reduce((prev: Chainable<HTMLElement>, key: string) => {
      return prev[key](attrs[key].value);
    }, chained);


    // Expect
    keys.forEach((key: string, index: number) => {
      // The actual element has the value
      expect(elem[key]).toEqual(attrs[key].expect || attrs[key].value);
      // The value is also in the list of __values__
      expect(chained._getChainValueAt(index)).toEqual(attrs[key].value);
    });
  });
});
