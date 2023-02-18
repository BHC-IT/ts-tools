/* eslint-disable @typescript-eslint/no-explicit-any */
import { Applicative } from './Applicative'
import { HKTKeys, InferTypeParam, InferTypeParamRec, URIToHKT } from './HKT'

export interface Monad<A, HKTUri extends HKTKeys>
	extends Applicative<A, HKTUri> {
	bind: <B>(f: (a: A) => URIToHKT<HKTUri, [B]>) => URIToHKT<HKTUri, [B]>
	flatten: (
		this: URIToHKT<HKTUri, [URIToHKT<HKTUri, [InferTypeParamRec<A>]>]>
	) => URIToHKT<HKTUri, [InferTypeParamRec<A>]>
}

export function bind<A extends Monad<unknown, any>, B>(
	f: (a: InferTypeParam<A>) => B,
	a: A
): B {
	return a.fmap(f)
}

export function flatten<A extends Monad<Monad<unknown, any>, any>>(
	a: A
): InferTypeParam<A> {
	return a.flatten()
}
