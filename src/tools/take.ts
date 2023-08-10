/**
 * This is the documentation for take.ts
 * @packageDocumentation
 * @module take
 *
 */

import { Tail, Head } from '../index'

/**
 * Send back the type of the tuple with Count element taken from the front.
 *
 *
 * @typeParam T		Any kind of tuple or array.
 * @typeParam Count	Number of element to take from the front.
 * @typeParam Taken	Internal use only. Should be left by default.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Take<
	T extends unknown[],
	Count extends number,
	Taken extends unknown[] = []
> = Taken extends { length: infer U }
	? U extends Count
		? Taken
		: Take<Tail<T>, Count, [...Taken, Head<T>]>
	: never

/**
 * Take some element at the start of the tuple or array.
 *
 *
 * @param nb		nb elements to take at the start.
 * @param t		Tuple or array to take from.
 * @return return a copy of t containing only nb firsts elements.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const take = <A extends unknown[], Count extends number>(
	nb: Count,
	t: [...A]
): Take<A, Count> => t.slice(0, nb) as Take<A, Count>
