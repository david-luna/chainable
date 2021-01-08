/**
 * Shorthand for typing any kind of function
 */
type AnyFunction = (...args: any[]) => any;

/**
 * These types transforms other types by declaring all properties
 * as method which return the same type
 * Making it chainable (yay!!)
 * We keep method signature by inferring the parameters using TS built-in types
 * https://stackoverflow.com/questions/50773038/inferring-function-parameters-in-typescript
 * (see second answer)
 */
type ChainObject<T> = {
  [K in keyof T]?:  T[K] extends AnyFunction ? (...args: Parameters<T[K]>) => Chainable<T> :
                    (val?: T[K]) => Chainable<T>;
};

// To resolve array.reduce types
type ReducerFunction<T,U> = (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U;

type ChainArray<T> = {
  [K in keyof Array<T>]?: K extends number ? (val?: T) => ChainArray<T> :
                          K extends 'length' ? (length?: number) => ChainArray<T> :
                          K extends 'reduce' ? (reducer: ReducerFunction<T, any>, initialValue: any) => ChainArray<T> :
                          Array<T>[K] extends AnyFunction ? (...args: Parameters<Array<T>[K]>) => ChainArray<T>:
                          never;
};

// Thanks to https://dev.to/aexol/typescript-tutorial-infer-keyword-2cn
// I've got better idea of how to use infer :)
type Chain<T> = T extends number ? ChainObject<Number> :
                T extends boolean ? ChainObject<Boolean> :
                T extends Array<infer K> ? ChainArray<K> : ChainObject<T>;


/**
 * This type is to add extra properties for our accessor methods
 * `_getChainReference` is a method which returns the original object
 * `_getChainValueAt` method which returns the result of the nth call
 */
type ChainRef<T> = {
  _getChainReference: () => T;
  _getChainValueAt: (i: number) => any;
}

/**
 * The chainable type is a union of the two above
 */
export type Chainable<T> = Chain<T> & ChainRef<T>;

export enum ChainableKeys {
  _getChainReference = '_getChainReference',
  _getChainValueAt   = '_getChainValueAt',
}
