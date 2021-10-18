import { Effect } from '../effects/Effect'

export function fmap<A, B extends any, EA extends Effect<A>, EB extends Effect<A>>(f: (a: A) => B, a : EA): EB
export function fmap<A, B extends any, EA extends Effect<A>, EB extends Effect<A>>(f: (a: A) => B, a : EA[]): EB[]

export function fmap<A, B extends any, EA extends Effect<A>, EB extends Effect<A>>(f: (a: A) => B, a : EA | EA[]): EB | EB[] {
	return Array.isArray(a) ?
		a.map(e => e.fmap(f)) :
		a.fmap(f) as any
}
