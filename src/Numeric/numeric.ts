import { Add, Eql, Gt, Gte, Lt, Lte, Minus, Next, Prev } from './types'

export const next = <A extends number>(a: A): Next<A> => (a + 1) as Next<A>
export const prev = <A extends number>(a: A): Prev<A> => (a - 1) as Prev<A>
export const add = <A extends number, B extends number>(
	a: A,
	b: B
): Add<A, B> => (a + b) as Add<A, B>
export const minus = <A extends number, B extends number>(
	a: A,
	b: B
): Minus<A, B> => (a - b) as Minus<A, B>
export const gt = <A extends number, B extends number>(a: A, b: B): Gt<A, B> =>
	(a > b) as Gt<A, B>
export const gte = <A extends number, B extends number>(
	a: A,
	b: B
): Gte<A, B> => (a >= b) as Gte<A, B>
export const lt = <A extends number, B extends number>(a: A, b: B): Lt<A, B> =>
	(a < b) as Lt<A, B>
export const lte = <A extends number, B extends number>(
	a: A,
	b: B
): Lte<A, B> => (a <= b) as Lte<A, B>
export const eql = <A extends number, B extends number>(
	a: A,
	b: B
): Eql<A, B> => ((a as number) === (b as number)) as unknown as Eql<A, B>
