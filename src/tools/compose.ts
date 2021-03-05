/**
	* This is the documentation for compose.ts
	* @packageDocumentation
	* @module compose
	*
*/

/**
	* Compose a reverse pipe.
	*
	*
	* @param fns		Functions to compose.
	* @return Composed function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const compose = (...fns : Function[]) => fns.reduce((f, g) => (...args : any[]) => f(g(...args)));
