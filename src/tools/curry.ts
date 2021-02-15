/**
	* This is the documentation for curry.ts
	* @packageDocumentation
	* @module curry
	*
*/

/**
	* Curry a function.
	*
	*
	* @param func		Function to curry.
	* @param args		Argument to pine to curried function.
	* @return Curried function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const curry = (func : Function, ...args : any[]) => (...trail : any[]) => func(...args, ...trail);