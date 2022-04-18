
import type { Drop } from '../index'
import { init } from '../index'


type Recurse<T> =
	T extends { __rec: unknown }
	? Recurse<_Recurse<T>>
	: T;

type _Recurse<T> =
	T extends { __rec: never } ? never
	: T extends { __rec: { __rec: infer U } } ? { __rec: _Recurse<U> }
	: T extends { __rec: infer U } ? U
	: T;

//export type Repeat<T, N extends number> = Recurse<_Repeat<T, N, []>>
export type Repeat<T, N extends number> = TestArray<Recurse<_Repeat<T, N, []>>>
type TestArray<T> = T extends unknown[] ? T : []

type _Repeat<T, N extends number, A extends T[]> =
	A["length"] extends N
	? A
	: { __rec: _Repeat<T, N, [T, ...A]> };

export type XS = Repeat<"x", 10>;

export type testRep = Repeat<boolean, 4>

export type Next<I extends number> = I extends 0 ? 1 : [...Repeat<1, I>, 1] extends {length: infer U} ? U extends number ? U : never : never
export type Add<I extends number, J extends number> = [...Repeat<1, I>, ...Repeat<1, J>] extends {length: infer U} ? U extends number ? U : never : never
export type Minus<I extends number, J extends number> = Drop<Repeat<1, I>, J> extends {length: infer U} ? U extends number ? U : never : never
export type Prev<I extends number> = Minus<I, 1>
export type Mult<I extends number, J extends number> = J extends 0 ? 0 : J extends 1 ? I : Add<I, Mult<I, Minus<J, 1>>>
export type Gt<I extends number, J extends number> = I extends 0 ? false : J extends 0 ? true : Gt<Minus<I, 1>, Minus<J, 1>>
export type Gte<I extends number, J extends number> = I extends 0 ? (J extends 0 ? true : false) : J extends 0 ? true : Gte<Minus<I, 1>, Minus<J, 1>>
export type Lt<I extends number, J extends number> = Gt<J, I>
export type Lte<I extends number, J extends number> = Gte<J, I>


export type ProduceTo<I extends number> = I extends 0 ? I : ProduceTo<Prev<I>> | I

export type testN = Next<4>
export type testN2 = Next<0>
export type testN3 = Next<15>
export type testAdd = Add<4, 5>
export type testAdd2 = Add<2, 2>
export type testMinus = Minus<9, 5>
export type testMinus2 = Minus<1, 5>
export type testMinus3 = Minus<5, 5>
export type testMult = Mult<2, 5>
export type testMult2 = Mult<3, 5>
export type testGt = Gt<6, 5>
export type testGt2 = Gt<3, 5>
export type testGt3 = Gt<5, 5>

export type testGte = Gte<6, 5>
export type testGte2 = Gte<3, 5>
export type testGte3 = Gte<1, 1>

export type testLt = Lt<6, 5>
export type testLt2 = Lt<3, 5>
export type testLt3 = Lt<1, 1>

export type testLte = Lte<6, 5>
export type testLte2 = Lte<3, 5>
export type testLte3 = Lte<1, 1>


export type ProduceToTest = ProduceTo<5>


export type RepeatTuple<T extends unknown[], Count extends number, Acc extends unknown[] = []> = Count extends 0 ? Acc : RepeatTuple<T, Prev<Count>, [...Acc, ...T]>

export type testRepeatTuple = RepeatTuple<[boolean, string, number], 3>

/*export type Repeat<T, Count extends number> = T extends unknown[] ? RepeatTuple<T, Count> : RepeatElem<T, Count>

export type testRepeat = Repeat<[boolean, string, number], 3>
export type testRepeat2 = Repeat<boolean, 1>*/


export type SafeArray<T, Length extends number> = {
	record: T[],
	length: Length,
	type?: T
}
export type SafeArrayAccess<T, L extends number, P extends number> = Gte<L, P> extends true ? T : never

export const start = <T>(): SafeArray<T, 0> => ({
	record: [],
	length: 0,
})

export const length = <T, L extends number>(arr: SafeArray<T, L>): L => arr.length

export const push = <T, L extends number>(arr: SafeArray<T, L>, i: T): SafeArray<T, Next<L>> => ({
	record: [...arr.record, i],
	length: arr.length + 1 as Next<L>,
})

export const pop = <T, L extends number>(arr: SafeArray<T, L>): SafeArray<T, Prev<L>> => ({
	record: init(arr.record),
	length: arr.length - 1 as Prev<L>,
})

export const at = <T, L extends number>(arr: SafeArray<T, L>, p: ProduceTo<L>): T => arr.record[p]

export const testArr = start<number>()
export const testArr2 = push(testArr, 0)
export const testArr3 = push(testArr2, 0)
export const testArr4 = push(testArr3, 0)
export const testArr5 = at(testArr3, 1)
export const testArr6 = at(testArr3, 5)
