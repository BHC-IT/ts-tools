import { Effect } from '../effects/Effect'

export const fmap = <A, B extends any, E extends Effect<A>>(f: (a: A) => B, a : E | E[]): any =>
	Array.isArray(a) ?
		a.map(e => e.fmap(f)) :
		a.identity().fmap(f, a)