export type AnyFunction = (...args: any[]) => any;
export interface UnaryFunction<T, R> { (source: T): R; }

type ArrayMethods = 'filter' | 'map' | 'slice' | 'sort';

export type EnhancedArray<T> = Omit<Array<T>, ArrayMethods> & {
  filter (fn: (item: T, index: number, arr: Array<T>) => boolean): EnhancedArray<T>;
  map <Q>(fn: (item: T, index: number, arr: Array<T>) => Q): EnhancedArray<Q>;
  tap (fn: (item: T, index: number, arr: Array<T>) => unknown): EnhancedArray<T>;
  slice (begin: number, end: number): EnhancedArray<T>;
  sort (fn?: (firstEl: T, seconEl: T) => number): EnhancedArray<T>;
}
