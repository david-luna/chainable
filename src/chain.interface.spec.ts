import { Chainable } from './types';
import { chainable } from './chainable';

interface RawTypes {
  any?: any;
  str?: string;
  bol?: boolean;
  num?: number;
  strArr?: string[];
  bolArr?: boolean[];
  numArr?: number[];
  strObj?: {[key:string]: string };
  bolObj?: {[key:string]: boolean };
  numObj?: {[key:string]: number };
  strMap?: Map<string, string>;
  bolMap?: Map<string, boolean>;
  numMap?: Map<string, number>;
  strSet?: Set<string>;
  bolSet?: Set<boolean>;
  numSet?: Set<number>;
}

interface SuperType {
  raw?: RawTypes
  concat?: (a: string, b: string) => string;
}

describe('chain with interfaces', () => {

  let raw: RawTypes;
  let sup: SuperType;
  let chainedRaw: Chainable<RawTypes>;
  let chainedSup : Chainable<SuperType>;
  
  afterEach(() => {
    raw = null;
    sup = null;
    chainedRaw = null;
    chainedSup = null;
  });

  describe('interface properties', () => {
    it('should resolve all interface types properly', () => {
      // Prepare
      raw = {
        any   : undefined,
        str   : undefined,
        strArr: undefined,
        strObj: undefined,
        strMap: undefined,
        strSet: undefined,
        bol   : undefined,
        bolArr: undefined,
        bolObj: undefined,
        bolMap: undefined,
        bolSet: undefined,
        num   : undefined,
        numArr: undefined,
        numObj: undefined,
        numMap: undefined,
        numSet: undefined,
      };
      chainedRaw = chainable(raw);

      // Execute
      chainedRaw
      .any(2)
      .str('one')
      .strArr(['one', 'two', 'three'])
      .strObj({ 1: 'one', 2: 'two', 3: 'three'})
      .strMap(new Map([['1', 'one'], ['2', 'two'], ['3', 'three']]))
      .strSet(new Set(['one', 'two', 'three']))
      .bol(true)
      .bolArr([true, false])
      .bolObj({ t: true, f: false })
      .bolMap(new Map([['true', true], ['false', false]]))
      .bolSet(new Set([true, false]))
      .num(0)
      .numArr([0,1,2])
      .numObj({ 0: 0, 1: 1, 2: 2 })
      .numMap(new Map([['0', 0],['1', 1],['2', 2]]))
      .numSet(new Set([0,1,2]))

      // Expect
      expect(raw).toEqual({
        any   : 2,
        str   : 'one',
        strArr: ['one', 'two', 'three'],
        strObj: { 1: 'one', 2: 'two', 3: 'three'},
        strMap: new Map([['1', 'one'], ['2', 'two'], ['3', 'three']]),
        strSet: new Set(['one', 'two', 'three']),
        bol   : true,
        bolArr: [true, false],
        bolObj: { t: true, f : false },
        bolMap: new Map([['true', true], ['false', false]]),
        bolSet: new Set([true, false]),
        num   : 0,
        numArr: [0,1,2],
        numObj: { 0: 0, 1    : 1, 2    : 2 },
        numMap: new Map([['0', 0],['1', 1],['2', 2]]),
        numSet: new Set([0,1,2]),
      });
    });

    it('should resolve all interface types properly', () => {
      // Prepare
      sup = {
        raw: {},
        concat: (a, b) => `${a} + ${b}`
      };
      chainedSup = chainable(sup);

      // Execute
      chainedSup
      .raw({
        any: 2,
        str: 'one',
        bol: true,
        num: 0,
      })
      .concat('1', '2');

      // Expect
      expect(chainedSup._getChainReference().raw).toEqual({
        any: 2,
        str: 'one',
        bol: true,
        num: 0,
      });

      expect(chainedSup._getChainValueAt(1)).toEqual('1 + 2');
    });

    it('should throw if some property is missing/not initialized', () => {
      // Expect
      expect(() => chainedRaw.str('one')).toThrowError(TypeError);
    });
  });
});
