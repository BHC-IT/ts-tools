/* eslint-disable @typescript-eslint/no-explicit-any */
import { HKTKeys, HKTURI, InferTypeParam, URIToHKT } from './HKT'

export interface Functor<A, HKTUri extends HKTKeys> extends HKTURI<HKTUri> {
	fmap: <B>(f: (a: A) => B) => URIToHKT<HKTUri, [B]>
}

export function fmap<A extends Functor<unknown, any>, B>(
	f: (a: InferTypeParam<A>) => B,
	a: A
): URIToHKT<A['__URI__'], [B]> {
	return a.fmap(f)
}
