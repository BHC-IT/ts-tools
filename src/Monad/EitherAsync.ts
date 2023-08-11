// Copyright (c) 2023, BHC-IT. All rights reserved. Licensed under the MIT License.
import { Either, left as ELeft, right as ERight } from './Either'
import { Task, resolve, fromPromise } from './Task'
import { Monad } from './TypeConstructors/Monad'

/**
 * EitherAsync is a monad that can be either a left or a right
 *
 *
 * @typeParam E the left type
 * @typeParam A the right type
 *
 *
 * @example
 * ```typescript
 * // Usage of EitherAsync with a right value
 * import { eitherAsync, EitherAsync } from '@bhc/ts-tools'
 * const i: EitherAsync<string, number> = eitherAsync.right(0)
 * i.fmap(x => x + 1).fromRight(0) // 1
 * i.bind(x => eitherAsync.right(x + 1)).fromRight(0) // 1
 * ```
 * @example
 * ```typescript
 * // Usage of EitherAsync with a left value
 * import { eitherAsync, EitherAsync } from '@bhc/ts-tools'
 * const j: EitherAsync<string, number> = eitherAsync.left('test')
 * j.fmap(x => x + 1).fromRight(0) // 0
 * j.bind(x => eitherAsync.right(x + 1)).fromRight(0) // 0
 * ```
 */
export interface EitherAsync<E, A> extends Monad<[E, A], 'EitherAsync'> {
	/**
	 * @deprecated to hide the implementation details
	 * @internal
	 */
	_record: Task<Either<E, A>>

	/**
	 * get the value of the EitherAsync if it is a left or a default value
	 * @param e - the default value
	 * @returns
	 */
	fromLeft: (e: E) => Task<E>

	/**
	 * get the value of the EitherAsync if it is a right or a default value
	 * @param a - the default value
	 * @returns - the value of the EitherAsync
	 */
	fromRight: (a: A) => Task<A>

	/**
	 * call f if the EitherAsync is a left or g if the EitherAsync is a right and return the result
	 * @param f - the function to apply if the EitherAsync is a left
	 * @param g - the function to apply if the EitherAsync is a right
	 * @returns
	 */
	fromEitherAsync: <B>(f: (e: E) => B, g: (a: A) => B) => Task<B>

	toPromise: () => Promise<Either<E, A>>

	toTask: () => Task<Either<E, A>>
}

function _innerFromLeft<E, A>(this: EitherAsync<E, A>, e: E): Task<E> {
	return this._record.fmap(res => res.fromLeft(e))
}

function _innerFromRight<E, A>(this: EitherAsync<E, A>, a: A): Task<A> {
	return this._record.fmap(res => res.fromRight(a))
}

function _innerFromEitherAsync<E, A, B>(
	this: EitherAsync<E, A>,
	f: (e: E) => B,
	g: (a: A) => B
): Task<B> {
	return this._record.fmap(res => res.fromEither(f, g))
}

function _innerFmap<E, A, B>(
	this: EitherAsync<E, A>,
	f: (a: A) => B
): EitherAsync<E, B> {
	return fromTaskEither(this._record.fmap(e => e.fmap(f)))
}

function _innerApply<E, A, B>(
	this: EitherAsync<E, A>,
	f: EitherAsync<E, (a: A) => B>
): EitherAsync<E, B> {
	return f.bind(inner => this.fmap(inner))
}

async function __proxyBind<E, A, B>(
	this: EitherAsync<E, A>,
	f: (a: A) => EitherAsync<E, B>
): Promise<Either<E, B>> {
	try {
		const res = await this._record
		if (res.right) return f(res._record as A)._record
		return resolve(res as unknown as Either<E, B>)
	} catch (e) {
		return toTaskEither(left(e))
	}
}

function _innerBind<E, A, B>(
	this: EitherAsync<E, A>,
	f: (a: A) => EitherAsync<E, B>
) {
	return fromTaskEither<E, B>(__proxyBind.call(this, f))
}

async function _proxyFlatten<E, A>(
	a: EitherAsync<EitherAsync<E, A>, EitherAsync<E, A>>
): Promise<Either<E, A>> {
	const tmp = await a._record
	const rec = tmp._record
	return await rec._record
}

function _innerFlatten<E, A>(
	this: EitherAsync<EitherAsync<E, A>, EitherAsync<E, A>>
): EitherAsync<E, A> {
	return fromTaskEither(fromPromise(_proxyFlatten(this)))
}

function _innerToPromise<E, A>(this: EitherAsync<E, A>): Promise<Either<E, A>> {
	return this._record
}

function _innerToTask<E, A>(this: EitherAsync<E, A>): Task<Either<E, A>> {
	return this._record
}

/**
 * construct a left EitherAsync
 * @typeParam E the left type
 * @typeParam A the right type
 * @param e - value of the EitherAsync
 * @returns
 */
export const left = <E, A>(e: E): EitherAsync<E, A> => ({
	_record: resolve(ELeft(e)),
	__URI__: 'EitherAsync',
	fromLeft: _innerFromLeft,
	fromRight: _innerFromRight,
	fromEitherAsync: _innerFromEitherAsync,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten,
	toPromise: _innerToPromise,
	toTask: _innerToTask
})

/**
 * construct a right EitherAsync
 * @typeParam E the left type
 * @typeParam A the right type
 * @param a - value of the EitherAsync
 * @returns
 */
export const right = <E, A>(a: A): EitherAsync<E, A> => ({
	_record: resolve(ERight(a)),
	__URI__: 'EitherAsync',
	fromLeft: _innerFromLeft,
	fromRight: _innerFromRight,
	fromEitherAsync: _innerFromEitherAsync,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten,
	toPromise: _innerToPromise,
	toTask: _innerToTask
})

export function fromTaskEither<E, A>(
	te: Task<Either<E, A>>
): EitherAsync<E, A> {
	return {
		_record: te,
		__URI__: 'EitherAsync',
		fromLeft: _innerFromLeft,
		fromRight: _innerFromRight,
		fromEitherAsync: _innerFromEitherAsync,
		fmap: _innerFmap,
		apply: _innerApply,
		bind: _innerBind,
		flatten: _innerFlatten,
		toPromise: _innerToPromise,
		toTask: _innerToTask
	}
}

export function fromEither<E, A>(e: Either<E, A>): EitherAsync<E, A> {
	return fromTaskEither(resolve(e))
}

async function _constructSaneTask<E, A>(p: Promise<A>): Promise<Either<E, A>> {
	try {
		return ERight(await p)
	} catch (e) {
		return ELeft(e)
	}
}

export function fromTask<E, A>(t: Task<A>): EitherAsync<E, A> {
	return fromTaskEither(fromPromise(_constructSaneTask(t)))
}

export function fromFunction<E, A>(f: () => Promise<A>): EitherAsync<E, A> {
	try {
		return fromTaskEither(fromPromise(_constructSaneTask(f())))
	} catch (e) {
		return left(e)
	}
}

export function toTaskEither<E, A>(ea: EitherAsync<E, A>): Task<Either<E, A>> {
	return ea._record
}

/**
 * lift a function to the EitherAsync monad
 * @typeParam E the left type
 * @typeParam A the right type
 * @typeParam B the return type
 * @param f - the function to lift
 * @returns - the lifted function
 */
export function lift<E, A, B>(f: (a: A) => B) {
	return (e: EitherAsync<E, A>) => e.fmap(f)
}
