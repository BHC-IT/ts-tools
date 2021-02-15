/**
	* This is the documentation for init.ts
	* @packageDocumentation
	* @module init
	*
*/

/**
	* Drop the last element of the tuple or array.
	*
	*
	* @param tuple		Tuple or array to cut.
	* @return Copy of the original tuple or array minus his last element.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const init = (tuple : any[]) : any => [...tuple].splice(0, tuple.length - 1);