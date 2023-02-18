/* eslint-disable @typescript-eslint/no-explicit-any */
import { Init, Last } from '../..'
import { HKTKeys, HKTURI, InferTypeParams, URIToHKT } from './HKT'

export interface Functor<A extends unknown[], HKTUri extends HKTKeys>
	extends HKTURI<HKTUri> {
	fmap: <B>(f: (a: Last<A>) => B) => URIToHKT<HKTUri, [...Init<A>, B]>
}

export function fmap<A extends Functor<unknown[], any>, B>(
	f: (a: Last<InferTypeParams<A>>) => B,
	a: A
): URIToHKT<A['__URI__'], [...Init<InferTypeParams<A>>, B]> {
	return a.fmap(f)
}
