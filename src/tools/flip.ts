/**
	* This is the documentation for flip.ts
	* @packageDocumentation
	* @module flip
	*
*/

import type { Tail, Head } from '../index'

/**
	* Send back the type of the fliped tuple or array.
	*
	*
	* @template T		Any kind of tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type FlipT<T extends unknown[]> = T extends [] ? [] : [...(FlipT<Tail<T>>), Head<T>]

/**
	* Send back a function type with fliped params.
	*
	*
	* @template T		Any kind of function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type FlipF<T> = T extends (...a: infer Params) => infer R ? (...a: FlipT<Params>) => R : never


/**
	* Flip tuple.
	*
	*
	* @param args		Tuple to flip.
	* @return Fliped function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const flipt = <T extends unknown[]>(args: [...T]): FlipT<T> =>
	args.reverse() as FlipT<T>

/**
	* Flip arguments order of a function.
	*
	*
	* @param fn		Function to flip.
	* @return Fliped function.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const flip = <T extends unknown[], R>(fn: (...args: [...T]) => R): ((...a: FlipT<T>) => R) =>
	(...args: [...FlipT<T>]): R => fn(...args.reverse() as T)
