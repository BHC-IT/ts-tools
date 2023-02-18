import { tail } from '../tools/tail'
import { Monad } from './TypeConstructors/Monad'

export interface Maybe<A> extends Monad<A, 'Maybe'> {
	_record: A
	isJust: () => boolean
	isNothing: () => boolean
	fromJust: () => A
	fromMaybe: (d: A) => A
	toList: () => A[]
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

function _innerApply<A, B>(this: Maybe<A>, f: Maybe<(a: A) => B>) {
	return f.bind(f => this.fmap(f))
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

export function isJust<A>(m: Maybe<A>) {
	return m.isJust()
}

export function isNothing<A>(m: Maybe<A>) {
	return m.isNothing()
}

export function fromJust<A>(m: Maybe<A>) {
	return m.fromJust()
}

export function fromMaybe<A>(d: A, m: Maybe<A>) {
	return m.fromMaybe(d)
}

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
