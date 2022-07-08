import { Effect, SwapType, OpenEffectRecusif } from '../effects/Effect'

export function fmap<A extends Effect<unknown>, B>(
	f: (a: OpenEffectRecusif<A>) => B,
	a: A
): SwapType<A, [B]>
export function fmap<A extends Effect<unknown>, B>(
	f: (a: OpenEffectRecusif<A>) => B,
	a: A[]
): SwapType<A, [B]>[]
/*export function fmap<A, B, EA extends Effect<A>, EB extends Effect<A>>(f: (a: A) => B, a : EA[]): EB[]*/

export function fmap<A extends Effect<unknown>, B>(
	f: (a: OpenEffectRecusif<A>) => B,
	a: A | A[]
): SwapType<A, [B]> | SwapType<A, [B]>[] {
	return Array.isArray(a)
		? a.map(value => fmap(f, value))
		: (a
				.flatten()
				.fmap((b: OpenEffectRecusif<A>) => f(b)) as unknown as SwapType<
				A,
				[B]
		  >)
}
