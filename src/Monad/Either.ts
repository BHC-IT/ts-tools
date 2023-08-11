// Copyright (c) 2023, BHC-IT. All rights reserved. Licensed under the MIT License.
import { Monad } from './TypeConstructors/Monad'

/**
 * Either is a monad that can be either a left or a right
 *
 *
 * @typeParam E the left type
 * @typeParam A the right type
 *
 *
 * @example
 * ```typescript
 * // Usage of Either with a right value
 * import { either, Either } from '@bhc/ts-tools'
 * const i: Either<string, number> = either.right(0)
 * i.fmap(x => x + 1).fromRight(0) // 1
 * i.bind(x => either.right(x + 1)).fromRight(0) // 1
 * ```
 * @example
 * ```typescript
 * // Usage of Either with a left value
 * import { either, Either } from '@bhc/ts-tools'
 * const j: Either<string, number> = either.left('test')
 * j.fmap(x => x + 1).fromRight(0) // 0
 * j.bind(x => either.right(x + 1)).fromRight(0) // 0
 * ```
 */
export interface Either<E, A> extends Monad<[E, A], 'Either'> {
	/**
	 * @internal
	 */
	_record: A | E

	/**
	 * get the value of the Either if it is a left or a default value
	 * @param e - the default value
	 * @returns
	 */
	fromLeft: (e: E) => E

	/**
	 * get the value of the Either if it is a right or a default value
	 * @param a - the default value
	 * @returns - the value of the Either
	 */
	fromRight: (a: A) => A

	/**
	 * call f if the Either is a left or g if the Either is a right and return the result
	 * @param f - the function to apply if the Either is a left
	 * @param g - the function to apply if the Either is a right
	 * @returns
	 */
	fromEither: <B>(f: (e: E) => B, g: (a: A) => B) => B
	isLeft: () => boolean
	isRight: () => boolean
	left: boolean
	right: boolean
}

function _innerFromLeft<E, A>(this: Either<E, A>, e: E): E {
	if (this.right) return e
	return this._record as E
}

function _innerFromRight<E, A>(this: Either<E, A>, a: A): A {
	if (!this.right) return a
	return this._record as A
}

function _innerFromEither<E, A, B>(
	this: Either<E, A>,
	f: (e: E) => B,
	g: (a: A) => B
): B {
	if (this.right) return g(this._record as A)
	return f(this._record as E)
}

function _innerFmap<E, A, B>(this: Either<E, A>, f: (a: A) => B): Either<E, B> {
	if (this.right) return right(f(this._record as A))
	return left<E, B>(this._record as E)
}

function _innerApply<E, A, B>(
	this: Either<E, A>,
	f: Either<E, (a: A) => B>
): Either<E, B> {
	return f.bind(inner => this.fmap(inner))
}

function _innerBind<E, A, B>(this: Either<E, A>, f: (a: A) => Either<E, B>) {
	if (this.right) return f(this._record as A)
	return left<E, B>(this._record as E)
}

function _innerFlatten<E, A>(
	this: Either<Either<E, A>, Either<E, A>>
): Either<E, A> {
	if (this.right) return this._record as Either<E, A>
	return left<E, A>(this._record as E)
}

/**
 * construct a left Either
 * @typeParam E the left type
 * @typeParam A the right type
 * @param e - value of the Either
 * @returns
 */
export const left = <E, A>(e: E): Either<E, A> => ({
	_record: e,
	isLeft: () => true,
	isRight: () => false,
	left: true,
	right: false,
	__URI__: 'Either',
	fromLeft: _innerFromLeft,
	fromRight: _innerFromRight,
	fromEither: _innerFromEither,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten
})

/**
 * construct a right Either
 * @typeParam E the left type
 * @typeParam A the right type
 * @param a - value of the Either
 * @returns
 */
export const right = <E, A>(a: A): Either<E, A> => ({
	_record: a,
	isLeft: () => false,
	isRight: () => true,
	left: false,
	right: true,
	__URI__: 'Either',
	fromLeft: _innerFromLeft,
	fromRight: _innerFromRight,
	fromEither: _innerFromEither,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten
})

/**
 * lift a function to the Either monad
 * @typeParam E the left type
 * @typeParam A the right type
 * @typeParam B the return type
 * @param f - the function to lift
 * @returns - the lifted function
 */
export function lift<E, A, B>(f: (a: A) => B) {
	return (e: Either<E, A>) => e.fmap(f)
}
