/**
 * This is the documentation for curry.ts
 * @packageDocumentation
 * @module curry
 *
 */

import { FlipT, Head, Tail, Length } from '../index'

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
export const curry =
	<T extends unknown[], U extends unknown[], R>(
		func: (...args: [...T, ...U]) => R,
		...args: T
	) =>
	(...trail: U) =>
		func(...args, ...trail)

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
export const rcurry = <T extends unknown[], U extends unknown[], R>(
	func: (...args: [...U, ...T]) => R,
	...args: [...T]
): ((...a: FlipT<U>) => R) =>
	((...trail: U) =>
		func(
			...(trail.reverse() as U),
			...(args.reverse() as T)
		)) as unknown as (...a: FlipT<U>) => R

export type Curry<T extends (...a: unknown[]) => unknown> = T extends (
	...a: infer Args
) => infer Ret
	? Length<Args> extends 0
		? Ret
		: (a: Head<Args>) => Curry<(...a: Tail<Args>) => Ret>
	: never

// const betterCurry =
// 	<T extends unknown[], R>(
// 		func: (...a: [...T]) => R
// 	): Curry<(...a: [...T]) => R> =>
// 	(a: Head<T>) =>
// 		func.length === 1 ? func(a) : betterCurry(func.bind(null, a))
