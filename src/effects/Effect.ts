export abstract class Effect<A> {
	static fmap: <A, B>(f: (a: A) => B, a: Effect<A>) => Effect<B>
	abstract fmap: <B>(f: (a: A) => B) => Effect<B>
	static bind: <A, B>(f: (a: A) => Effect<B>, a: Effect<A>) => Effect<B>
	abstract bind: <B>(f: (a: A) => Effect<B>) => Effect<B>
	static from: <A>(a: A) => Effect<A>
	static lift: <A, B>(f: (a: A) => B) => (a: Effect<A>) => Effect<B>
	public identity = () => Effect
	abstract isValide: () => boolean
	abstract _open: () => unknown

	public flatten = (): Effect<A> => {
		if (this.isValide()) {
			const rec = this._open()
			if (rec instanceof Effect) {
				return rec.flatten()
			} else {
				return this
			}
		} else {
			return this
		}
	}
}

export type recordType<A extends Effect<A>> = A

export type OpenEffect<A> = A extends Effect<infer B> ? B : never

export type OpenEffectRecusif<A> = A extends Effect<infer B>
	? B extends Effect<unknown>
		? OpenEffectRecusif<B>
		: B
	: never

export type EffectRecusif<E extends Effect<A>, A> =
	| E
	| Effect<EffectRecusif<E, A>>

import { Maybe } from './Maybe'
import { Either } from './Either'
import { Throwable } from './Throwable'

export const MaybeURI = 'Maybe'
export const EitherURI = 'Either'
export const ThrowableURI = 'Throwable'

export interface HKT<A extends unknown[]> {
	[MaybeURI]: Maybe<A[0]>
	[EitherURI]: Either<A[0], A[1]>
	[ThrowableURI]: Throwable<A[0]>
}

export type HKTToURI<A extends Effect<unknown>> = {
	[K in keyof HKT<unknown[]>]: A extends HKT<unknown[]>[K] ? K : undefined
}[keyof HKT<unknown[]>]

export type URIToHKT<
	URI extends keyof HKT<A>,
	A extends unknown[]
> = HKT<A>[URI]
export type TestURI = URIToHKT<'Maybe', [number]>

export type SwapType<E extends Effect<unknown>, B extends unknown[]> = URIToHKT<
	HKTToURI<E>,
	B
>

export type TestSwap = SwapType<Maybe<number>, [string]>
