import { NumericTypes } from '../index'

export namespace Numeric {
	export const next = <A extends number>(a: A): NumericTypes.Next<A> =>
		(a + 1) as NumericTypes.Next<A>
	export const prev = <A extends number>(a: A): NumericTypes.Prev<A> =>
		(a - 1) as NumericTypes.Prev<A>
	export const add = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Add<A, B> => (a + b) as NumericTypes.Add<A, B>
	export const minus = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Minus<A, B> => (a - b) as NumericTypes.Minus<A, B>
	export const gt = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Gt<A, B> => (a > b) as NumericTypes.Gt<A, B>
	export const gte = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Gte<A, B> => (a >= b) as NumericTypes.Gte<A, B>
	export const lt = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Lt<A, B> => (a < b) as NumericTypes.Lt<A, B>
	export const lte = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Lte<A, B> => (a <= b) as NumericTypes.Lte<A, B>
	export const eql = <A extends number, B extends number>(
		a: A,
		b: B
	): NumericTypes.Eql<A, B> =>
		((a as number) === (b as number)) as unknown as NumericTypes.Eql<A, B>
}
