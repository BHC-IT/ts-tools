/**
 * This is the documentation for flip.ts
 * @packageDocumentation
 * @module flip
 *
 */

import type { Tail, Head } from '.'

/**
 * Send back the type of the fliped tuple or array.
 *
 *
 * @typeParam T		Any kind of tuple or array.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Flip<T extends unknown[]> = T extends []
	? []
	: [...Flip<Tail<T>>, Head<T>]

/**
 * Flip tuple.
 *
 *
 * @param args		Tuple to flip.
 * @return Fliped function.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const flip = <T extends unknown[]>(args: readonly [...T]): Flip<T> =>
	[...args].reverse() as Flip<T>
