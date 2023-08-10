/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Maybe } from '../Maybe'
import type { Task } from '../Task'
import type { Either } from '../Either'
import type { EitherAsync } from '../EitherAsync'

export const MaybeURI = 'Maybe'
export const TaskURI = 'Task'
export const EitherURI = 'Either'
export const EitherAsyncURI = 'EitherAsync'

/**
 * @internal
 * @description
 * A Higher Kinded Type (HKT) is a type constructor that takes a type as an argument.
 * @type
 * URI: The URI of the HKT.
 * @uri
 * MaybeURI = 'Maybe'
 * TaskURI = 'Task'
 * EitherURI = 'Either'
 * EitherAsyncURI = 'EitherAsync'
 */
export interface HKTURI<URI extends string> {
	/**
	 * @deprecated to hide the implementation details
	 * @internal
	 */
	__URI__: URI
}

/**
 * @internal
 * @description
 * A Higher Kinded Type (HKT) is a type constructor that takes a type as an argument.
 * @type
 * A: The type of the value(s) encapsulated by the HKT.
 */
export interface HKT<A extends unknown[]> {
	[MaybeURI]: Maybe<A[0]>
	[TaskURI]: Task<A[0]>
	[EitherURI]: Either<A[0], A[1]>
	[EitherAsyncURI]: EitherAsync<A[0], A[1]>
}

/**
 * @internal
 */
export type HKTFilter<A> = {
	[K in HKTKeys]: A extends HKT<unknown[]>[K] ? K : undefined
}

/**
 * @internal
 */
export type HKTKeys = keyof HKT<unknown[]>

/**
 * @internal
 */
export type TestHKTFilter = HKTFilter<Either<number, number>>

/**
 * @internal
 */
export type HKTToURI<A> = HKTFilter<A>[keyof HKT<unknown[]>]

/**
 * @internal
 */
export type TestHKTToURI = HKTToURI<Either<string, number>>

/**
 * @internal
 */
export type URIToHKT<URI extends HKTKeys, A extends unknown[]> = HKT<A>[URI]

/**
 * @internal
 */
export type SwapType<E, B extends unknown[]> = URIToHKT<HKTToURI<E>, B>

/**
 * @internal
 */
export type TestSwapType = SwapType<Either<number, string>, [boolean]>

/**
 * @internal
 */
export type InferTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T]
>
	? T
	: A extends URIToHKT<A['__URI__'], [unknown, infer T]>
	? T
	: never

/**
 * @internal
 */
export type InferTypeParams<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T]
>
	? [T]
	: A extends URIToHKT<A['__URI__'], [infer U, infer T]>
	? [U, T]
	: never

/**
 * @internal
 */
export type InferTypeParamRec<A> = A extends HKTURI<any>
	? InferTypeParam<A> extends HKTURI<any>
		? InferTypeParamRec<InferTypeParam<A>>
		: InferTypeParam<A>
	: A

/**
 * @internal
 */
export type TestInferTypeParamRec = InferTypeParamRec<Maybe<Maybe<number>>>

/**
 * @internal
 */
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

/**
 * @internal
 */
export type TestInferTypeParam = InferTypeParamsRec<
	Either<string, Either<number, string>>
>

/**
 * @internal
 */
export type InferFunctorTypeParam<A extends HKTURI<any>> = A extends URIToHKT<
	A['__URI__'],
	[infer T extends (...a: any) => any]
>
	? T
	: never
