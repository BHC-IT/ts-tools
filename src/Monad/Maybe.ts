import { tail } from '../Tuple/tail'
import { Monad } from './TypeConstructors/Monad'

/**
 * Maybe Monad
 * @param A Type of the value contained in the Maybe
 * @example
 * ```typescript
 * // Usage of Maybe with a value
 * import { maybe, Maybe } from '@bhc/ts-tools'
 * const i: Maybe<number> = maybe.just(0)
 * i.fmap(x => x + 1).fromJust() // 1
 * i.bind(x => maybe.just(x + 1)).fromJust() // 1
 * ```
 * @example
 * ```typescript
 * // Usage of Maybe with no value
 * import { maybe, Maybe } from '@bhc/ts-tools'
 * const j: Maybe<number> = maybe.nothing
 * j.fmap(x => x + 1).fromJust() // throw TypeError
 * j.bind(x => maybe.just(x + 1)).fromJust() // throw TypeError
 * ```
 *
 */
export interface Maybe<A> extends Monad<[A], 'Maybe'> {
	_record: A
	__URI__: 'Maybe'
	isJust: () => boolean
	isNothing: () => boolean
	/**
	 * get the value of the Maybe if it is a just or throw an error
	 * @returns - the value of the Maybe
	 * @throws - if the Maybe is nothing
	 */
	fromJust: () => A
	/**
	 * get the value of the Maybe if it is a just or a default value
	 * @param d - the default value
	 * @returns - the value of the Maybe
	 */
	fromMaybe: (d: A) => A

	toList: () => A[]
	/**
	 * call f if the Maybe is a just or g if the Maybe is a nothing and return the result
	 * @param f - the function to apply if the Maybe is a just
	 * @param g - the function to apply if the Maybe is a nothing
	 * @returns - the result of the function call
	 * @example
	 * ```typescript
	 * const i: Maybe<number> = maybe.just(0)
	 * i.case(x => x + 1, () => 0) // 1
	 * ```
	 * @example
	 * ```typescript
	 * const j: Maybe<number> = maybe.nothing
	 * j.case(x => x + 1, () => 0) // 0
	 * ```
	 */
	case: <B>(f: (a: A) => B, g: () => B) => B
}

function _innerFromJust<A>(this: Maybe<A>) {
	if (this.isJust()) return this._record
	throw new TypeError('Maybe is nothing, but fromJust was called')
}

function _innerFromMaybe<A>(this: Maybe<A>, d: A) {
	if (this.isJust()) return this._record
	return d
}

function _innerToList<A>(this: Maybe<A>) {
	if (this.isJust()) return [this._record]
	return []
}

function _innerCase<A, B>(this: Maybe<A>, f: (a: A) => B, g: () => B) {
	if (this.isJust()) return f(this._record)
	return g()
}

function _innerFmap<A, B>(this: Maybe<A>, f: (a: A) => B): Maybe<B> {
	if (this.isJust()) return just(f(this._record))
	return nothing
}

function _innerApply<A, B>(this: Maybe<A>, f: Maybe<(a: A) => B>): Maybe<B> {
	return f.bind(inner => this.fmap(inner))
}

function _innerBind<A, B>(this: Maybe<A>, f: (a: A) => Maybe<B>) {
	if (this.isJust()) return f(this._record)
	return nothing
}

function _innerFlatten<A>(this: Maybe<Maybe<A>>): Maybe<A> {
	if (this.isJust()) return this._record
	else return nothing
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nothing: Maybe<any> = {
	_record: undefined,
	__URI__: 'Maybe',
	isJust: () => false,
	isNothing: () => true,
	fromJust: _innerFromJust,
	fromMaybe: _innerFromMaybe,
	toList: _innerToList,
	case: _innerCase,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten,
}

export const just = <A>(a: A): Maybe<A> => ({
	_record: a,
	__URI__: 'Maybe',
	isJust: () => true,
	isNothing: () => false,
	fromJust: _innerFromJust,
	fromMaybe: _innerFromMaybe,
	toList: _innerToList,
	case: _innerCase,
	fmap: _innerFmap,
	apply: _innerApply,
	bind: _innerBind,
	flatten: _innerFlatten,
})

/**
 * Checks if a Maybe is a Just
 * @param m Maybe to check
 * @returns true if the Maybe is a Just
 * @example
 * isJust(nothing) // false
 * isJust(just(1)) // true
 * @see isNothing
 */
export function isJust<A>(m: Maybe<A>) {
	return m.isJust()
}

/**
 * Checks if a Maybe is a Nothing
 * @param m Maybe to check
 * @returns true if the Maybe is a Nothing
 * @example
 * isNothing(nothing) // true
 * isNothing(just(1)) // false
 * @see isJust
 */
export function isNothing<A>(m: Maybe<A>) {
	return m.isNothing()
}

/**
 * Extracts the value from a Just
 * @param m Maybe to extract from
 * @returns the value from the Just
 * @throws TypeError if the Maybe is a Nothing
 * @example
 * fromJust(just(1)) // 1
 * fromJust(nothing) // throws TypeError
 * @see fromMaybe
 * @see case
 *
 * @typeParam A Type of the value in the Maybe
 */
export function fromJust<A>(m: Maybe<A>) {
	return m.fromJust()
}

/**
 * Extracts the value from a Just or returns a default value
 * @param d Default value to return if the Maybe is a Nothing
 * @param m Maybe to extract from
 * @returns the value from the Just or the default value
 * @example
 * fromMaybe(0, just(1)) // 1
 * fromMaybe(0, nothing) // 0
 * @see fromJust
 * @see case
 * @typeParam A Type of the value in the Maybe
 */
export function fromMaybe<A>(d: A, m: Maybe<A>) {
	return m.fromMaybe(d)
}

/**
 * Converts a Maybe to a list
 * @param m Maybe to convert
 * @returns a list containing the value of the Maybe or an empty list
 * @example
 * toList(just(1)) // [1]
 * toList(nothing) // []
 * @see fromJust
 * @see fromMaybe
 * @typeParam A Type of the value in the Maybe
 */
export function toList<A>(m: Maybe<A>) {
	return m.toList()
}

export function fcase<A, B>(m: Maybe<A>, f: (a: A) => B, g: () => B) {
	return m.case(f, g)
}

export function fromList<A>(a: A[]): Maybe<A> {
	return a.length === 0 ? nothing : just(a[0])
}

export function cat<A>(a: Maybe<A>[]): A[] {
	return [
		...(a.length && isJust(a[0]) ? [a[0]._record] : []),
		...(a.length ? (cat(tail(a as [Maybe<A>])) as A[]) : []),
	]
}

/**
 * Maps a function over a Maybe
 * @param f Function to map
 * @param m Maybe to map over
 * @returns a Maybe containing the result of the function or a Nothing
 * @example
 * map(x => x + 1, just(1)) // just(2)
 * map(x => x + 1, nothing) // nothing
 * @see fmap
 * @see apply
 * @see bind
 * @typeParam A Type of the value in the Maybe
 * @typeParam B Type of the value in the resulting Maybe
 */
export function map<A, B>(f: (a: A) => Maybe<B>, a: A[]): B[] {
	return a.flatMap(value => toList(f(value)))
}

export function liftFromThrowable<A, Args extends unknown[]>(
	f: (...a: Args) => A
): (...a: Args) => Maybe<A> {
	return (...a: Args) => {
		try {
			return just(f(...a))
		} catch {
			return nothing
		}
	}
}

export function liftFromThrowableAsync<A, Args extends unknown[]>(
	f: (...a: Args) => Promise<A>
): (...a: Args) => Promise<Maybe<A>> {
	return async (...a: Args) => {
		try {
			return just(await f(...a))
		} catch {
			return nothing
		}
	}
}
