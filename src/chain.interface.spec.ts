import { Chainable } from './types';
import { chainable } from './chainable';

interface RawTypes {
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
  
  beforeEach(() => {
    raw = {};
    sup = {};
    chainedRaw = chainable<RawTypes>(raw);
    chainedSup = chainable<SuperType>(sup);
  });
  afterEach(() => {
    raw = null;
    sup = null;
    chainedRaw = null;
    chainedSup = null;
  });


  describe('interface properties', () => {

    it('should resolve all interface types properly', done => {
      // Prepare
      raw = {
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
      chainedRaw = chainable<RawTypes>(raw);

      // Execute
      chainedRaw
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
      done();
    });

    it('should resolve throw if some property is missing/not initialized', done => {
      // Expect
      expect(() => chainedRaw.str('one')).toThrowError(TypeError);
      done();
    });
  });
});
