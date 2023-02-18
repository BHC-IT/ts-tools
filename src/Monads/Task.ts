import { Monad } from './TypeConstructors/Monad'

export interface Task<A> extends Promise<A>, Monad<A, 'Task'> {
	toPromise: () => Promise<A>
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
	newP.toPromise = toPromise

	return newP
}

export function resolve<A>(a: A): Task<A> {
	return fromPromise(Promise.resolve(a))
}

export function reject<A>(a: A): Task<A> {
	return fromPromise(Promise.reject(a))
}

export function fromFunction<A>(f: () => Promise<A>): Task<A> {
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

export function toPromise<A>(this: Task<A>): Promise<A> {
	return this
}
