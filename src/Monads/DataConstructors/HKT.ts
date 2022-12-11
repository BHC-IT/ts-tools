/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Maybe } from '../Maybe'

export const MaybeURI = 'Maybe'

export interface HKTURI<A> {
	__URI__: A
}

export interface HKT<A extends unknown[]> {
	[MaybeURI]: Maybe<A[0]>
}

export type HKTFilter<A> = {
	[K in HKTKeys]: A extends HKT<unknown[]>[K] ? K : undefined
}

export type HKTKeys = keyof HKT<unknown[]>

export type TestHKTFilter = HKTFilter<Maybe<number>>

export type HKTToURI<A> = HKTFilter<A>[keyof HKT<unknown[]>]

export type TestHKTToURI = HKTToURI<Maybe<number>>

export type URIToHKT<URI extends HKTKeys, A extends unknown[]> = HKT<A>[URI]

export type TestURI = URIToHKT<'Maybe', [number]>

export type SwapType<E, B extends unknown[]> = URIToHKT<HKTToURI<E>, B>

export type TestSwap = SwapType<Maybe<number>, [string]>

export type InferTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T]
>
	? T
	: never

export type TestInferTypeParam = InferTypeParam<Maybe<number>>

export type InferFunctorTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T extends (...a: any) => any]
>
	? T
	: never

export type TestInferFunctorTypeParam = InferFunctorTypeParam<
	Maybe<(a: number) => string>
>
