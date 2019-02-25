/**
 * this type transforms other types by declaring all properties
 * as method which return the same type
 * Making it chainable (yay!!)
 */
type Chain<T> = {
  // TODO: check if there is a way to keep method signature
  // instead of having an Array<any> of arguments
  [P in keyof T]?:  T[P] extends Function ? (...args: any[]) => Chainable<T> :
                    (val: T[P]) => Chainable<T>;
};

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
 * Retunrs the list of enumerable and non enumeravble propertires up to the prototype chain
 * @param source the object to get properties from
 */
const getProperties = ( source: Object ): string[] => {
  // At the end we get no object
  if ( !source ) return [];

  // Get names and concat with recursive call to the prototype
  const proto: any = Object.getPrototypeOf(source);
  return Object.getOwnPropertyNames(source).concat(getProperties(proto));
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
  // initialize values array & props
  const props: string[] = getProperties(source);
  let values : any[]    = [];
  // Use Proxy to also allow to work also with unsetted props
  const proxy: ProxyConstructor = new Proxy(<any>source, {
    get: function ( target: Object, propKey: string ) {
      
      // Return reference if requested
      if ( propKey === ChainableKeys._getChainReference ) {
        return () => target;
      }
      // Return values if requested
      if ( propKey === ChainableKeys._getChainValueAt ) {
        return (index: number) => values[index];
      }

      // Warn of undetected property
      if ( props.indexOf(propKey) === -1 ) {
        console.warn(`Chainable: the property ${propKey} is not available in the proto of source object`)
      }

      // Bypass function call if exists
      if ( typeof target[propKey] === 'function' ) {
        return function (...args: any[]) {
          values.push(target[propKey].apply(target, args));
          return proxy;
        }
      }

      // Default accessor function by default
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

  return proxy as any;
}
