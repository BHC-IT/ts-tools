/* eslint-disable @typescript-eslint/no-explicit-any */
import { Init, Last } from '../../'
import { Applicative } from './Applicative'
import { HKTKeys, InferTypeParams, InferTypeParamsRec, URIToHKT } from './HKT'

/**
 * @description
 * A Monad is a type constructor that implements the bind function.
 * @laws
 * Left Identity: bind unit = id
 * Right Identity: bind f . unit = f
 * Associativity: bind f . bind g = bind (bind f . g)
 * @type
 * A: The type of the value(s) encapsulated by the Monad.
 * HKTUri: The URI of the Monad.
 * @note
 * Monad extends Applicative.
 */
export interface Monad<A extends unknown[], HKTUri extends HKTKeys>
	extends Applicative<A, HKTUri> {
	/**
	 * @description
	 * bind :: Monad m => (a -> m b) -> m a -> m b.
	 * Sequentially compose two actions, passing any value produced by the first as an argument to the second.
	 * @example
	 * just(1).bind(x => just(x + 1)) // just(2)
	 * nothing.bind(x => just(x + 1)) // nothing
	 * @law
	 * Left Identity: bind unit = id
	 * @param f The function to bind to the value(s) encapsulated by the Monad.
	 * @returns A new Monad of the same type with the function applied to its value(s).
	 */
	bind: <B>(
		f: (a: Last<A>) => URIToHKT<HKTUri, [...Init<A>, B]>
	) => URIToHKT<HKTUri, [...Init<A>, B]>

	/**
	 * @description
	 * flatten :: Monad m => m (m a) -> m a.
	 * Flatten a nested Monad.
	 * @example
	 * just(just(1)).flatten() // just(1)
	 * @returns A new Monad of the same type with the nested Monad flattened.
	 */
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

/**
 * @description
 * bind :: Monad m => (a -> m b) -> m a -> m b.
 * Sequentially compose two actions, passing any value produced by the first as an argument to the second.
 * @example
 * just(1).bind(x => just(x + 1)) // just(2)
 * nothing.bind(x => just(x + 1)) // nothing
 * @law
 * Left Identity: bind unit = id
 * @param f The function to bind to the value(s) encapsulated by the Monad.
 * @param a The Monad to bind the function to.
 * @returns A new Monad of the same type with the function applied to its value(s).
 */
export function bind<A extends Monad<unknown[], any>, B>(
	f: (
		a: Last<InferTypeParams<A>>
	) => Monad<[...Init<InferTypeParams<A>>, B], any>,
	a: A
): URIToHKT<A['__URI__'], [...Init<InferTypeParams<A>>, B]> {
	return a.bind(f)
}

/**
 * @description
 * flatten :: Monad m => m (m a) -> m a.
 * Flatten a nested Monad.
 * @example
 * just(just(1)).flatten() // just(1)
 * @param a The Monad to flatten.
 * @returns A new Monad of the same type with the nested Monad flattened.
 */
export function flatten<A extends Monad<Monad<unknown[], any>[], any>>(
	a: A
): URIToHKT<A['__URI__'], InferTypeParamsRec<A>> {
	return a.flatten()
}
