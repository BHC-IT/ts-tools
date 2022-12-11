import type { Func, F } from '../types/Functions'

import { Effect } from '../effects/Effect'

import { forward } from './forward'

/**
 * This is the documentation for pipe.ts
 * @packageDocumentation
 * @module pipe
 *
 */

/**
 * Compose a pipe.
 *
 *
 * @param fns		Functions to pipe.
 * @return Piped function.
 *
 * @author Valentin Vivier <lanathlor>
 */
/*
declare function pipe<T extends Func, U extends Func, R extends Func>
    (...functions: [T, ...U[], R]) : (...args: Parameters<T>) => ReturnType<R>;
*/

export const pipe = <A, R>(
	...fns: [(...a: A[]) => unknown, ...Func[], (a: unknown) => R]
): F<A, R> =>
	fns.reduce(
		(f: Func, g: Func): Func =>
			(...a: unknown[]) =>
				g(f(...a))
	) as F<A, R>

export const pipeAsync = <A, R>(
	...fns: [(...a: A[]) => unknown, ...Func[], (a: unknown) => R]
): F<A, R> =>
	fns.reduce(
		(f: Func, g: Func): Func =>
			async (...args: unknown[]) =>
				g(await f(...args))
	) as F<A, R>
