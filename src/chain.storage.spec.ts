import { chainable, Chainable } from './chain';


describe('chain with Sync Storage (local & session)', () => {

  describe('Local Storage', () => {

    // Prepare
    let storage: Chainable<Storage> = chainable(localStorage);
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
      expect(storage._getChainReference()).toBe(localStorage);
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
      expect(storage._getChainReference()).toBe(localStorage);
      done();
    });
  });

  describe('Session Storage', () => {
    // Prepare
    let storage: Chainable<Storage> = chainable(sessionStorage);
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
      expect(storage._getChainReference()).toBe(sessionStorage);
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
      expect(storage._getChainReference()).toBe(sessionStorage);
      done();
    });

  });
});
