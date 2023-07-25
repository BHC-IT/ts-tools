/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Maybe } from '../Maybe'
import type { Task } from '../Task'
import type { Either } from '../Either'
import type { EitherAsync } from '../EitherAsync'

export const MaybeURI = 'Maybe'
export const TaskURI = 'Task'
export const EitherURI = 'Either'
export const EitherAsyncURI = 'EitherAsync'

export interface HKTURI<A> {
	/**
	 * @internal
	 */
	__URI__: A
}

export interface HKT<A extends unknown[]> {
	[MaybeURI]: Maybe<A[0]>
	[TaskURI]: Task<A[0]>
	[EitherURI]: Either<A[0], A[1]>
	[EitherAsyncURI]: EitherAsync<A[0], A[1]>
}

export type HKTFilter<A> = {
	[K in HKTKeys]: A extends HKT<unknown[]>[K] ? K : undefined
}

export type HKTKeys = keyof HKT<unknown[]>

export type TestHKTFilter = HKTFilter<Either<number, number>>

export type HKTToURI<A> = HKTFilter<A>[keyof HKT<unknown[]>]

export type TestHKTToURI = HKTToURI<Either<string, number>>

export type URIToHKT<URI extends HKTKeys, A extends unknown[]> = HKT<A>[URI]

export type SwapType<E, B extends unknown[]> = URIToHKT<HKTToURI<E>, B>

export type TestSwapType = SwapType<Either<number, string>, [boolean]>

export type InferTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T]
>
	? T
	: A extends URIToHKT<A['__URI__'], [unknown, infer T]>
	? T
	: never

export type InferTypeParams<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T]
>
	? [T]
	: A extends URIToHKT<A['__URI__'], [infer U, infer T]>
	? [U, T]
	: never

export type InferTypeParamRec<A> = A extends HKTURI<any>
	? InferTypeParam<A> extends HKTURI<any>
		? InferTypeParamRec<InferTypeParam<A>>
		: InferTypeParam<A>
	: A

export type TestInferTypeParamRec = InferTypeParamRec<Maybe<Maybe<number>>>

export type InferTypeParamsRec<A> = A extends HKTURI<any>
	? A extends URIToHKT<A['__URI__'], [infer T]>
		? T extends HKTURI<any>
			? InferTypeParamsRec<T>
			: [T]
		: A extends URIToHKT<A['__URI__'], [infer T, infer U]>
		? [
				...(T extends HKTURI<any> ? InferTypeParamsRec<T> : [T]),
				...(U extends HKTURI<any> ? InferTypeParamsRec<U> : [U])
		  ]
		: [A]
	: [A]

export type TestInferTypeParam = InferTypeParamsRec<
	Either<string, Either<number, string>>
>

export type InferFunctorTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T extends (...a: any) => any]
>
	? T
	: never
