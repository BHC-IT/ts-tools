/* eslint-disable @typescript-eslint/no-explicit-any */
import { Init, Last } from '../../'
import { Functor } from './Functor'
import { HKTKeys, InferFunctorTypeParam, URIToHKT } from './HKT'

export interface Applicative<A extends unknown[], HKTUri extends HKTKeys>
	extends Functor<A, HKTUri> {
	apply: <B>(
		f: Applicative<[...Init<A>, (a: Last<A>) => B], HKTUri>
	) => URIToHKT<HKTUri, [...Init<A>, B]>
}

export function apply<F extends Applicative<[(...a: any[]) => any], any>>(
	f: F,
	a: URIToHKT<F['__URI__'], Parameters<InferFunctorTypeParam<F>>>
): URIToHKT<F['__URI__'], [ReturnType<InferFunctorTypeParam<F>>]> {
	return a.apply(f)
}
