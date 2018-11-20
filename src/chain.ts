/**
 * this type transforms other types by declaring all properties
 * as method which return the same type
 * Making it chainable (yay!!)
 */
export type Chain<T> = {
  // TODO: check if there is a way to keep method signature
  // instead of having an array of arguments
  [P in keyof T]?: (...args: any[]) => Chain<T>;
};


// type ChainRef<T> = {
//   __ref__   : T;
//   __values__: any[];
// }

// /**
//  * The chainable type add two more properties
//  * __ref__: is the original reference of the object
//  * __values__: is an array of the values returned for each chaned call
//  */
// export type Chainable<T> = Chain<T> & ChainRef<T>;


/**
 * Retunrs the list of enumerable and non enumeravble propertires up to the prototype chain
 * @param source the object to get properties from
 */
function getProperties ( source: Object ): string[] {
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
 *   1. __ref__ is a reference to the original object
 *   2. __values__ are all values returned by the calls in the chain (to get valeus if you need them)
 * @param source the object to make chainable
 */
export function chain<T>( source: T ): Chain<T> {
  // Get the list of methods 
  const props: string[] = getProperties(source);

  // Reduce properties aggregagin methods
  return props.reduce((prev: Object, p: string) => {
    // Decide what to do if function or property
    if ( typeof source[p] === 'function' ) {
      prev[p] = function (...args) {
        // Call the original function with the proper scope and return same object
        source[p].apply(source, args);
        return prev;
      };
    } else {
      // Override value properties with a setter/getter function
      prev[p] = function (val) {
        source[p] = val || source[p];
        return prev;
      };
    }
    return prev;
  }, {});

}
