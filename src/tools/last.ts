/**
	* This is the documentation for last.ts
	* @packageDocumentation
	* @module last
	*
*/

/**
	* Send back the type of the last element of the tuple or array.
	*
	*
	* @template T		Any kind of tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Last<T extends any[]> = T extends [...infer I, infer L] ? L : T[0];


/**
	* Get the last element of a tuple or array.
	*
	*
	* @param tuple		Tuple or array to get last item.
	* @template T		Any kind of tuple or array.
	* @return Last element.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const last = <T extends any[]>(arg : T) : Last<T> => arg[arg.length - 1];