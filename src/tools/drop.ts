/**
 * This is the documentation for drop.ts
 * @packageDocumentation
 * @module drop
 *
 */

import { Tail, Head } from '../index'

type _Drop<
	T extends unknown[],
	Count extends number,
	Droped extends unknown[] = []
> = Droped extends { length: infer U }
	? U extends Count
		? T
		: _Drop<Tail<T>, Count, [...Droped, Head<T>]>
	: []

/**
 * Send back the type of the tuple with Count element droped from the front.
 *
 *
 * @template T		Any kind of tuple or array.
 * @template Count	Number of element to drop from the front.
 * @template Droped	Internal use only. Should be left by default.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Drop<T extends unknown[], Count extends number> = _Drop<T, Count>

/**
 * Drop nb element of a tuple or array.
 *
 *
 * @param nb		nb element to drop.
 * @param t		Tuple or array to drop from.
 * @return Tuple or array of droped of nb element.
 *
 * @author Valentin Vivier <lanathlor>
 */

export const drop = <T extends unknown[], Count extends number>(
	nb: Count,
	t: [...T]
): Drop<T, Count> => [...t].slice(nb, t.length) as Drop<T, Count>
