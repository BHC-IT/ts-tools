/* eslint-disable @typescript-eslint/no-explicit-any */
import { Init, Last } from '../../'
import { Applicative } from './Applicative'
import { HKTKeys, InferTypeParams, InferTypeParamsRec, URIToHKT } from './HKT'

export interface Monad<A extends unknown[], HKTUri extends HKTKeys>
	extends Applicative<A, HKTUri> {
	bind: <B>(
		f: (a: Last<A>) => URIToHKT<HKTUri, [...Init<A>, B]>
	) => URIToHKT<HKTUri, [...Init<A>, B]>
	flatten: (
		this: URIToHKT<
			HKTUri,
			[
				URIToHKT<HKTUri, InferTypeParamsRec<A[0]>>,
				URIToHKT<HKTUri, InferTypeParamsRec<A[0]>>
			]
		>
	) => URIToHKT<HKTUri, InferTypeParamsRec<A[0]>>
}

export function bind<A extends Monad<unknown[], any>, B>(
	f: (
		a: Last<InferTypeParams<A>>
	) => Monad<[...Init<InferTypeParams<A>>, B], any>,
	a: A
): URIToHKT<A['__URI__'], [...Init<InferTypeParams<A>>, B]> {
	return a.bind(f)
}

export function flatten<A extends Monad<Monad<unknown[], any>[], any>>(
	a: A
): URIToHKT<A['__URI__'], InferTypeParamsRec<A>> {
	return a.flatten()
}
