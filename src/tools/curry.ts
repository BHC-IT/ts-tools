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
export const curry = <T extends any[], U extends any[], R extends any>(func : (...args: [...T, ...U]) => R, ...args : T) => (...trail : U) => func(...args, ...trail);

/**
	* Reverse curry a function.
	*
	*
	* @param func		Function to curry.
	* @param args		Argument to pine to curried function.
	* @return Curried function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const rcurry = <T extends any[], U extends any[], R extends any>(func : (...args: [...U, ...T]) => R, ...args : T) => (...trail : U) => func(...(trail.reverse() as U), ...(args.reverse() as T));
