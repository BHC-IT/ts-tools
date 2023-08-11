/**
 * This is the documentation for last.ts
 * @packageDocumentation
 * @module last
 *
 */

/**
 * Send back the type of the last element of the tuple or array.
 *
 *
 * @typeParam T		Any kind of tuple or array.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Last<T extends readonly unknown[]> = T extends [
	...unknown[],
	infer L
]
	? L
	: T extends unknown
	? []
	: T[0]

export type LastNoneEmpty<T extends [unknown, ...unknown[]]> = T extends [
	...unknown[],
	infer L
]
	? L
	: T[0]

/**
 * Get the last element of a tuple or array.
 *
 *
 * @param tuple		Tuple or array to get last item.
 * @typeParam T		Any kind of tuple or array.
 * @return Last element.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const last = <T extends unknown[]>(arg: readonly [...T]): Last<T> =>
	(arg.at(-1) ?? []) as Last<T>
