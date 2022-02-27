/**
	* This is the documentation for curry.ts
	* @packageDocumentation
	* @module curry
	*
*/

import { FlipT } from '../index'

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
export const curry = <T extends unknown[], U extends unknown[], R>(func : (...args: [...T, ...U]) => R, ...args : T) => (...trail : U) => func(...args, ...trail);

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
export const rcurry = <T extends unknown[], U extends unknown[], R>(func : (...args: [...U, ...T]) => R, ...args : [...T]): ((...a: FlipT<U>) => R) =>
	((...trail : U) => func(...(trail.reverse() as U), ...(args.reverse() as T))) as unknown as ((...a: FlipT<U>) => R) ;
