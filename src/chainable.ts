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

enum ChainableKeys {
  _getChainReference = '_getChainReference',
  _getChainValueAt   = '_getChainValueAt',
}

/**
 * 
 * @param source the object where to check for the property
 * @param key    the property key to lookup
 */
const hasProperty = ( source: Object, key: string ): boolean => {
  // End of recursion cases
  if ( !source ) {
    return false;
  }
  if ( Object.getOwnPropertyNames(source).indexOf(key) !== -1 ) {
    return true;
  }
  // recursion
  return hasProperty(Object.getPrototypeOf(source), key);
}

/**
 * Returns an chainable object with the same API and properites like the source with 2 differences
 * - properties become a getter/setter method depending if they have parameter
 * - we get 2 extra properties
 *   1. `_getChainReference` is a method which returns the original object
 *   2. `_getChainValueAt` method which returns the result of the nth call
 * @param source the object to make chainable
 */
export function chainable<T>( source: T ): Chainable<T> {
  // initialize values array
  const values: any[] = [];

  // make sure we're passing an object
  const sourceType: string = typeof source;
  let sourceObj: Object;

  switch(sourceType) {
    case 'string':
      sourceObj = new String(source);
      break;
    case 'number':
        sourceObj = new Number(source);
        break;
    case 'boolean':
      sourceObj = new Boolean(source);
      break;
    default:
      sourceObj = source;
  }

  // Use Proxy to also allow to work also with unset props
  const proxy = new Proxy(sourceObj, {
    get: function ( target: Object, propKey: string ) {
      // Return reference or values if requested
      if ( propKey === ChainableKeys._getChainReference ) {
        return () => source;
      }
      if ( propKey === ChainableKeys._getChainValueAt ) {
        return (index: number) => values[index];
      }

      // Throw if undetected property in strict mode
      if ( !hasProperty(source, propKey) && chainable.prototype.strict ) {
        throw new TypeError(`Chainable: the property ${propKey} is not available in the proto of source object`);
      }

      // Bypass function call if exists
      if ( typeof target[propKey] === 'function' ) {
        return function (...args: any[]) {
          values.push(target[propKey].apply(target, args));
          return proxy;
        }
      }

      // Default accessor getter/setter function by default 
      return function ( ...args: any[] ) {
        if ( args.length === 0 ) {
          values.push(target[propKey]);
        } else {
          values.push(target[propKey] = args[0]);
        }
        return proxy;
      }
    }
  });

  return proxy;
}

// Set default value for strict mode
chainable.prototype.strict = true;
