/**
 * This is the documentation for flip.ts
 * @packageDocumentation
 * @module flip
 *
 */

import { Flip as FlipT } from '../Tuple'

/**
 * Send back a function type with fliped params.
 *
 *
 * @typeParam T		Any kind of function.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Flip<T> = T extends (...a: infer Params) => infer R
	? (...a: FlipT<Params>) => R
	: never

/**
 * Flip arguments order of a function.
 *
 *
 * @param fn		Function to flip.
 * @return Fliped function.
 *
 */
export const flip =
	<T extends unknown[], R>(
		fn: (...args: [...T]) => R
	): ((...a: FlipT<T>) => R) =>
	(...args: [...FlipT<T>]): R =>
		fn(...(args.reverse() as T))
