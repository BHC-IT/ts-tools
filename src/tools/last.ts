/**
	* This is the documentation for last.ts
	* @packageDocumentation
	* @module last
	*
*/

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
export const last = <T extends any[]>(arg : T) : any => arg[arg.length - 1];