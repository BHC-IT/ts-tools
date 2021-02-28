/**
	* This is the documentation for flip.ts
	* @packageDocumentation
	* @module flip
	*
*/

/**
	* Flip arguments order of a function.
	*
	*
	* @param fn		Function to reverse.
	* @return Fliped function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const flip = <T>(fn: (...args: any[]) => T) : typeof fn => (...args: any[]): T => fn(...args.reverse() as any);
