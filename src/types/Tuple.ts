
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
type TestArray<T> = T extends unknown[] ? T : []

type _Repeat<T, N extends number, A extends T[]> =
	A["length"] extends N
	? A
	: { __rec: _Repeat<T, N, [T, ...A]> };


export type Repeat<T, N extends number> = TestArray<Recurse<_Repeat<T, N, []>>>
