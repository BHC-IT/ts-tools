/* eslint-disable @typescript-eslint/no-explicit-any */
import { Functor } from './Functor'
import { HKTKeys, InferFunctorTypeParam, URIToHKT } from './HKT'

type Init<T extends readonly unknown[]> = T extends [...infer I, unknown]
	? I
	: never

type Last<T extends readonly unknown[]> = T extends [...unknown[], infer L]
	? L
	: T[0]

/**
 * @description
 * An Applicative is a type constructor that implements the apply function.
 * @laws
 * Identity: apply (pure id) v = v
 * Homomorphism: apply (pure f) (pure x) = pure (f x)
 * Interchange: apply u (pure y) = apply (pure ($ y)) u
 * Composition: apply (apply (apply (pure compose) u) v) w = apply u (apply v w)
 * @type
 * A: The type of the value(s) encapsulated by the Applicative.
 * HKTUri: The URI of the Applicative.
 * @note
 * Applicative extends Functor.
 */
export interface Applicative<A extends unknown[], HKTUri extends HKTKeys>
	extends Functor<A, HKTUri> {
	/**
	 * @param f
	 * @param a
	 * @returns A new Applicative of the same type with the function applied to its value(s).
	 * @description
	 * apply :: Applicative f => f (a -> b) -> f a -> f b.
	 * Apply a function encapsulated by an Applicative to a value encapsulated by an Applicative.
	 * @example
	 * apply(just(x => x + 1), just(1)) // just(2)
	 * apply(just(x => x + 1), nothing) // nothing
	 * apply(nothing, just(1)) // nothing
	 * apply(nothing, nothing) // nothing
	 * @law
	 * Composition: apply (apply (apply (pure compose) u) v) w = apply u (apply v w)
	 */
	apply: <B>(
		f: Applicative<[...Init<A>, (a: Last<A>) => B], HKTUri>
	) => URIToHKT<HKTUri, [...Init<A>, B]>
}

/**
 * @param f
 * @param a
 * @returns A new Applicative of the same type with the function applied to its value(s).
 * @description
 * apply :: Applicative f => f (a -> b) -> f a -> f b.
 * Apply a function encapsulated by an Applicative to a value encapsulated by an Applicative.
 * @example
 * apply(just(x => x + 1), just(1)) // just(2)
 * apply(just(x => x + 1), nothing) // nothing
 * apply(nothing, just(1)) // nothing
 * apply(nothing, nothing) // nothing
 * @law
 * Composition: apply (apply (apply (pure compose) u) v) w = apply u (apply v w)
 */
export function apply<F extends Applicative<[(...a: any[]) => any], any>>(
	f: F,
	a: URIToHKT<F['__URI__'], Parameters<InferFunctorTypeParam<F>>>
): URIToHKT<F['__URI__'], [ReturnType<InferFunctorTypeParam<F>>]> {
	return a.apply(f)
}
