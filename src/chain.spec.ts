import { chain, Chain } from './chain';

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
      let result: Chain<HTMLElement> = chain(elem);
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
      let result: Chain<HTMLElement> = chain(elem);
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
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
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
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
        key4: 'value4',
      };

      // Execute
      let result: Chain<Storage> = chain(sessionStorage);
      for ( let a in data ) {
        result = result.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(localStorage.getItem(a)).toBe(data[a]);
      }
      done();
    });

  });
});
