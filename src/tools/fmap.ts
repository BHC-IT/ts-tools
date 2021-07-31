import { Effect } from '../effects/Effect'

export const fmap = <A, B extends any, E extends Effect<any>>(f: (a: A) => B, a : E | E[]): any =>
	Array.isArray(a) ?
		a.map(e => e.identity().fmap(f, e)) :
		a.identity().fmap(f, a)