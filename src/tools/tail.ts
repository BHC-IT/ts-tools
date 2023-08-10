/**
 * This is the documentation for tail.ts
 * @packageDocumentation
 * @module tail
 *
 */

/**
 * Send back the types of the tuple or array without his first element.
 *
 *
 * @typeParam T		Any kind of tuple or array.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Tail<T extends unknown[]> = T extends [
	head: unknown,
	...tail: infer U
]
	? U
	: never

/**
 * Send back a copy of a tuple or array without his first element.
 *
 *
 * @param tuple		Tuple or array to cut.
 * @typeParam T		Any kind of tuple or array.
 * @return Copy of the original tuple or array minus his first element.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const tail = <T extends unknown[]>([, ...tail]: [...T]): Tail<T> =>
	tail as Tail<T>
