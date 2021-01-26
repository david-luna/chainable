import { Chainable } from './types';
import { chainable } from './chainable';

describe('chain with Sync Storage (local & session)', () => {

  describe('Local Storage', () => {

    // Prepare
    let storage: Chainable<Storage> = chainable(localStorage);
    let data: {[attr: string]: string} = {
      localKey1: 'value1',
      localKey2: 'value2',
      localKey3: 'value3',
      localKey4: 'value4',
    };

    it('should work with setItem', () => {
      // Execute
      for ( let a in data ) {
        storage = storage.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(localStorage.getItem(a)).toBe(data[a]);
      }
      expect(storage._getChainReference()).toBe(localStorage);
    });

    it('should work with removeItem', () => {
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
    });
  });

  describe('Session Storage', () => {
    // Prepare
    let storage: Chainable<Storage> = chainable(sessionStorage);
    let data: {[attr: string]: string} = {
      sessionKey1: 'value1',
      sessionKey2: 'value2',
      sessionKey3: 'value3',
      sessionKey4: 'value4',
    };
    
    it('should work with setItem', () => {
      // Execute
      for ( let a in data ) {
        storage = storage.setItem(a, data[a]);
      }

      // Expect
      for ( let a in data ) {
        expect(sessionStorage.getItem(a)).toBe(data[a]);
      }
      expect(storage._getChainReference()).toBe(sessionStorage);
    });

    it('should work with removeItem', () => {
      // Execute
      for ( let a in data ) {
        storage = storage.removeItem(a);
      }

      // Expect
      for ( let a in data ) {
        expect(sessionStorage.getItem(a)).toEqual(null);
      }
      expect(sessionStorage.length).toEqual(0);
      expect(storage._getChainReference()).toBe(sessionStorage);
    });
  });
});
