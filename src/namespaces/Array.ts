import * as ts from '../index'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Array {
	export type Predicate<A> = ((value: A, index: number, array: Array<A>) => boolean)
	export type Map<A, B> = ((value: A, index: number, array: Array<A>) => B)
	export type Accumulator<A, B> = ((previousValue: B, value: A, index: number, array: Array<A>) => B)
	export type Sort<A> = ((a: A, b: A) => number)
	export const concat = <A>(arr: Array<A>, src: Array<A>) => arr.concat(src)
	export const copyWithin = <A>([...arr]: Array<A>, target?: number, start?: number, end?: number) => arr.copyWithin(target, start, end)
	export const entries = <A>(arr: Array<A>) => arr.entries()
	export const every = <A>(arr: Array<A>, f: Predicate<A>) => arr.every(f)
	export const fill = <A>([...arr]: Array<A>, value: A, start?: number, end?: number) => arr.fill(value, start, end)
	export const filter = <A>(arr: Array<A>, f: Predicate<A>) => arr.filter(f)
	export const find = <A>(arr: Array<A>, f: Predicate<A>) => arr.find(f)
	export const findIndex = <A>(arr: Array<A>, f: Predicate<A>) => arr.findIndex(f)
	export const flat = <A>(arr: Array<A>, deep?: number) => arr.flat(deep)
	export const flatMap = <A, B>(arr: Array<A>, f: Map<A, B>) => arr.flatMap(f)
	export const forEach = <A, B>(arr: Array<A>, f: Map<A, B>) => arr.forEach(f)
	export const includes = <A>(arr: Array<A>, value: A, start?: number) => arr.includes(value, start)
	export const indexOf = <A>(arr: Array<A>, value: A, start?: number) => arr.indexOf(value, start)
	export const join = <A extends string>(arr: Array<A>, separator?: A) => arr.join(separator)
	export const keys = <A>(arr: Array<A>) => arr.keys()
	export const lastIndexOf = <A>(arr: Array<A>, value: A, start?: number) => start !== undefined ? arr.lastIndexOf(value, start) : arr.lastIndexOf(value)
	export const map = <A, B>(arr: Array<A>, f:Map<A, B>) => arr.map(f)
	export const pop = <A>([...arr]: Array<A>) => ts.forward(arr.pop(), () => arr)
	export const push = <A>([...arr]: Array<A>, ...values: A[]) => ts.forward(arr.push(...values), () => arr)
	export const reduce = <A, B>(arr: Array<A>, f: Accumulator<A, B>, initialValue?: B) => arr.reduce(f, initialValue)
	export const reduceRight = <A, B>(arr: Array<A>, f: Accumulator<A, B>, initialValue?: B) => arr.reduceRight(f, initialValue)
	export const reverse = <A>([...arr]: Array<A>) => arr.reverse()
	export const shift = <A>([...arr]: Array<A>) => ts.forward(arr.shift(), () => arr)
	export const slice = <A>(arr:Array<A>, start?: number, end?: number) => arr.slice(start, end)
	export const some = <A>(arr: Array<A>, f: Predicate<A>) => arr.some(f)
	export const sort = <A>([...arr]: Array<A>, f?: Sort<A>) => arr.sort(f)
	export const splice = <A>([...arr]: Array<A>, start?: number, nb?: number, ...elem: A[]) => arr.splice(start ?? 0, nb ?? arr.length, ...elem)
	export const toLocaleString = <A>(arr: Array<A>) => arr.toLocaleString()
	export const toString = <A>(arr: Array<A>) => arr.toString()
	export const unshift = <A>([...arr]: Array<A>, v:A, ...values: A[]) => ts.forward(arr.unshift(v, ...values), () => arr)
	export const values = <A>(arr: Array<A>) => arr.values()

	export const head = <A>([head,]: Array<A>) => head
	export const tail = <A>([, ...tail]: Array<A>) => tail
	export const init = <A>(arr: Array<A>) => ts.init(arr)
	export const last = <A>(arr: Array<A>) => ts.last(arr)
	export const repeat = <A>(value: A, nb: number): A[] => nb > 0 ? [value, ...repeat(value, nb - 1)] : []
	export const zip = <A, B>(arr1: A[], arr2: B[]): [A, B][] => arr1.map((e, i) => [e, arr2[i]])
}
