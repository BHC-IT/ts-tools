/**
 * This is the documentation for compose.ts
 * @packageDocumentation
 * @module compose
 *
 */

import type { Func, F } from '../index'

/**
 * Compose a reverse pipe.
 *
 *
 * @param fns		Functions to compose.
 * @return Composed function.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const compose = <A, R>(
	...fns: [(a: unknown) => R, ...Func[], (...a: A[]) => unknown]
): F<A, R> =>
	fns.reduce(
		(f: Func, g: Func): Func =>
			(...args: unknown[]) =>
				f(g(...args))
	) as unknown as F<A, R>

export const composeAsync = <A, R>(
	...fns: [(a: unknown) => R, ...Func[], (...a: A[]) => unknown]
): F<A, R> =>
	fns.reduce(
		(f: Func, g: Func) =>
			async (...args: unknown[]) =>
				f(await g(...args))
	) as unknown as F<A, R>
