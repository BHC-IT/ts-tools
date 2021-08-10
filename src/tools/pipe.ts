import type { Func, F } from '../types/Functions';

import { Effect } from '../effects/Effect';

import { forwardTern } from './forward';

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

export const pipe = <A extends Func, B extends Func, R extends Func>(...fns : [A, ...B[], R]): F<Parameters<A>, ReturnType<R>> =>
	fns.reduce(
		(f: Func, g: Func): any => (...a: any[]) => g(f(...a)),
	)

export const pipeAsync = <A extends Func, B extends Func, R extends Func>(...fns : [A, ...B[], R]): F<Parameters<A>, ReturnType<R>> =>
	fns.reduce(
		(f: Func, g: Func): any => async (...args : any[]) => g(await f(...args))
	)

export const pipeEffect = <A extends Func, B extends Func, R extends Func>(...fns : [A, ...B[], R]): F<Parameters<A>, ReturnType<R>> =>
	fns.reduce(
		(f: Func, g: Func): any => (...args : any[]) =>
			forwardTern(
				f(...args),
				(e) => e instanceof Effect,
				(e) =>  e.isValide() ? e.bind(g) : e,
				(e) => g(e)
			)
	)

export const pipeEffectAsync = <A extends Func, B extends Func, R extends Func>(...fns : [A, ...B[], R]): F<Parameters<A>, ReturnType<R>> =>
	fns.reduce(
		(f: Func, g: Func): any => async (...args : any[]) =>
			forwardTern(
				await f(...args),
				(e) => e instanceof Effect,
				(e) =>  e.isValide() ? e.bind(g) : e,
				(e) => g(e)
			)
	)
