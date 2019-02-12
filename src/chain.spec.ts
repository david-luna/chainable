import { chainable, Chainable } from './chain';

describe('chain', () => {

 

  beforeEach(() => {
  });

  afterEach(() => {
  });

  describe('DOM Elements', () => {

    it('should work with standar HTMLElement methods', done => {
      // Prepare
      let elem: HTMLElement = document.createElement('div');
      let data: {[attr: string]: string} = {
        id   : 'elem-id',
        name : 'elem-name',
        style: 'background: red'
      };

      // Execute
      let result: Chainable<HTMLElement> = chainable(elem);
      for ( let a in data ) {
        result = result.setAttribute(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(elem.getAttribute(a)).toBe(data[a]);
      }
      done();
    });

    it('should work with HTMLElement properties', done => {
      // Prepare
      let elem: HTMLElement = document.createElement('div');
      let data: {[attr: string]: string} = {
        id       : 'elem-id',
        dir      : 'rtl',
        accessKey: 'e',
        className: 'elem-class',
        innerHTML: '<p>hello</p>',
        // Style property accepts strung assignation but returns a CSSStyleDeclaration object
        //style    : 'background: red',
      };
  
      // Execute
      let result: Chainable<HTMLElement> = chainable(elem);
      for ( let a in data ) {
        result = result[a](data[a]);
      }
  
      // Expect
      for ( let a in data ) {
        expect(elem[a]).toBe(data[a]);
      }
      done();
    });

  });

  describe('Storage APIs', () => {

    it('should work with localStorage', done => {
      // Prepare
      let data: {[attr: string]: string} = {
        localkey1: 'value1',
        localkey2: 'value2',
        localkey3: 'value3',
        localkey4: 'value4',
      };

      // Execute
      let result: Chainable<Storage> = chainable(localStorage);
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
      let result: Chainable<Storage> = chainable(sessionStorage);
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
