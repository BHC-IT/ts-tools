import type { Func, F } from '../types/Functions';

import { Effect } from '../effects/Effect';

import { forward } from './forward';

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
			forward(
				f(...args),
				(e) => e instanceof Effect,
				(e) => e instanceof Effect ? (e.isValide() ? e.bind(g) : e) : g(e) ,
			)
	)

export const pipeEffectAsync = <A extends Func, B extends Func, R extends Func>(...fns : [A, ...B[], R]): F<Parameters<A>, ReturnType<R>> =>
	fns.reduce(
		(f: Func, g: Func): any => async (...args : any[]) =>
			forward(
				await f(...args),
				(e) => e instanceof Effect ? (e.isValide() ? e.bind(g) : e) : g(e) ,
			)
	)
