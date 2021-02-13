import type { Maybe } from '../types/Maybe';
import { Just, Nothing } from '../types/Maybe';

export const just = <T>(a: T) : Maybe<T> => ({_tag: 'just', value: a});
export const nothing : Nothing = {_tag:'nothing'};

export const isJust = <T>(a: Maybe<T>): a is Just<T> => a._tag === 'just';
export const isNothing = <T>(a: Maybe<T>): a is Nothing => a._tag === 'nothing';

export const callMaybe = (f : Function) => {
	return {
		when: {
			isJust: <T>(v: Maybe<T>) => isJust(v) ? f(v.value) : nothing,
			isNothing: <T>(v: Maybe<T>) => isNothing(v) ? f() : v.value,
		}
	}
}
