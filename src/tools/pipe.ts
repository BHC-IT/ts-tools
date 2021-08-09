/**
	* This is the documentation for pipe.ts
	* @packageDocumentation
	* @module pipe
	*
*/

/**
	* Compose a pipe.
	*
	*
	* @param fns		Functions to pipe.
	* @return Piped function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const pipe = (...fns : Function[]) => fns.reduce((f, g) => (...args : any[]) => g(f(...args)));

export const pipeAsync = (...fns : Function[]) => fns.reduce((f, g) => async (...args : any[]) => g(await f(...args)));
