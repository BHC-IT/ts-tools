import { eql } from '../index'

export const memoise = <A extends unknown[], B>(f:(...args: A) => B): ((...args: A) => B) => {

	const state: [A, B][] = []

	return (...args: A): B => {
		const last = state.find(e => eql(e[0], args))
		if (last)
			return last[1]
		const call = f(...args)
		state.push([args, call])
		return call;
	}
}