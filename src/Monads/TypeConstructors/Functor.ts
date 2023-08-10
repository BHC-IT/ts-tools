/* eslint-disable @typescript-eslint/no-explicit-any */
import { Init, Last } from '../..'
import { HKTKeys, HKTURI, InferTypeParams, URIToHKT } from './HKT'

/**
 * @description
 * A Functor is a type constructor that implements the fmap function.
 * @laws
 * Identity: fmap id = id
 * Composition: fmap (f . g) = fmap f . fmap g
 * @type
 * A: The type of the value(s) encapsulated by the Functor.
 * HKTUri: The URI of the Functor.
 */
export interface Functor<A extends unknown[], HKTUri extends HKTKeys>
	extends HKTURI<HKTUri> {
	/**
	 * @description
	 * fmap :: Functor f => (a -> b) -> f a -> f b.
	 * Map a function over the value(s) encapsulated by the Functor.
	 * @example
	 * just(1).fmap(x => x + 1) // just(2)
	 * nothing.fmap(x => x + 1) // nothing
	 * @law
	 * Composition: fmap (f . g) = fmap f . fmap g
	 * @param f The function to map over the value(s) encapsulated by the Functor.
	 * @param a The Functor to map the function over.
	 * @returns A new Functor of the same type with the function applied to its value(s).
	 */
	fmap: <B>(f: (a: Last<A>) => B) => URIToHKT<HKTUri, [...Init<A>, B]>
}

/**
 * @description
 * fmap :: Functor f => (a -> b) -> f a -> f b.
 * Map a function over the value(s) encapsulated by the Functor.
 * @example
 * just(1).fmap(x => x + 1) // just(2)
 * nothing.fmap(x => x + 1) // nothing
 * @law
 * Composition: fmap (f . g) = fmap f . fmap g
 * @param f The function to map over the value(s) encapsulated by the Functor.
 * @param a The Functor to map the function over.
 * @returns A new Functor of the same type with the function applied to its value(s).
 */
export function fmap<A extends Functor<unknown[], any>, B>(
	f: (a: Last<InferTypeParams<A>>) => B,
	a: A
): URIToHKT<A['__URI__'], [...Init<InferTypeParams<A>>, B]> {
	return a.fmap(f)
}
