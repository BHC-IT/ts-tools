import { Monad } from './TypeConstructors/Monad'

export interface Task<A> extends Promise<A>, Monad<A, 'Task'> {
	fmap: <B>(f: (a: A) => B) => Task<B>
	apply: <B>(f: Task<(a: A) => B>) => Task<B>
	bind: <B>(f: (a: A) => Task<B>) => Task<B>
	flatten: () => Task<A>
}

function __innerFmap<A, B>(this: Task<A>, f: (a: A) => B) {
	return fromPromise(this.then(f))
}

function __innerApply<A, B>(this: Task<A>, f: Task<(a: A) => B>) {
	return fromPromise(f.then(i => this.then(i)))
}

function __innerBind<A, B>(this: Task<A>, f: (a: A) => Task<B>) {
	return fromPromise(this.then(f))
}

function __innerFlatten<A>(this: Task<Task<A>>) {
	return fromPromise(this.then(a => a))
}

export function fromPromise<A>(a: Promise<A>): Task<A> {
	const newP: Task<A> = a as Task<A>
	newP.__URI__ = 'Task'
	newP.fmap = __innerFmap
	newP.apply = __innerApply
	newP.bind = __innerBind
	newP.flatten = __innerFlatten

	return newP
}

export function fromFunction<A>(f: () => A): Task<A> {
	return fromPromise(
		new Promise((res, rej) => {
			try {
				res(f())
			} catch (e) {
				rej(e)
			}
		})
	)
}
