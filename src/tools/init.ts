/**
	* This is the documentation for init.ts
	* @packageDocumentation
	* @module init
	*
*/

/**
	* Send back the types of the tuple or array elements but last.
	*
	*
	* @template T		Any kind of tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Init<T extends any[]> = T extends [...infer I, infer L] ? I : never;

/**
	* Drop the last element of the tuple or array.
	*
	*
	* @param tuple		Tuple or array to cut.
	* @return Copy of the original tuple or array minus his last element.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const init = <T extends any[]>(tuple : T) : Init<T> => [...tuple].splice(0, tuple.length - 1) as Init<T>;