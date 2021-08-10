import { Effect } from '../effects/Effect'

export function fmap<A, B extends any, E extends Effect<A | B>>(f: (a: A) => B, a : E): E;
export function fmap<A, B extends any, E extends Effect<A | B>>(f: (a: A) => B, a : E[]): E[];

export function fmap<A, B extends any, E extends Effect<A | B>>(f: (a: A) => B, a : E | E[]): E | E[] {
	return Array.isArray(a) ?
		a.map(e => e.fmap(f)) :
		a.fmap(f) as any
}
