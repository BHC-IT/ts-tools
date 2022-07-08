// A -> A
export const identity = <A>(a: A): A => a

// A -> B -> A
export const constant: <A, B>(a: A, b: B) => A = <A>(a: A): A => a

// (A -> B) -> A -> B
export const apply = <A, B>(f: (a: A) => B, a: A): B => f(a)

// A -> (A -> B) -> B
export const thrust = <A, B>(a: A, f: (_1: A) => B): B => f(a)

// (A -> A -> B) -> A -> B
export const duplication = <A, B>(f: (_1: A, _2: A) => B, a: A): B => f(a, a)

// (A -> B -> C) -> B -> A -> C
export const flip = <A, B, C>(f: (_1: A, _2: B) => C, b: B, a: A): C => f(a, b)

// (B -> C) -> (A -> B) -> A -> C
export const compose2 = <A, B, C>(f: (_1: B) => C, g: (_1: A) => B, a: A): C =>
	f(g(a))

// (A -> B -> C) -> (A -> B) -> A -> C
export const substitution = <A, B, C>(
	f: (_1: A, _2: B) => C,
	g: (_1: A) => B,
	a: A
): C => f(a, g(a))

// (A -> B -> C) -> (B -> A) -> B -> C
export const chain = <A, B, C>(
	f: (_1: A, _2: B) => C,
	g: (_1: B) => A,
	b: B
): C => f(g(b), b)

// (B -> C -> D) -> (A -> B) -> (A -> C) -> A -> D
export const converge = <A, B, C, D>(
	f: (_1: B, _2: C) => D,
	g: (_1: A) => B,
	h: (_1: A) => C,
	a: A
): D => f(g(a), h(a))

// (B -> B -> C) -> (A -> B) -> A -> A -> C
export const psi = <A, B, C>(
	f: (_1: B, _2: B) => C,
	g: (_1: A) => B,
	a1: A,
	a2: A
): C => f(g(a1), g(a2))

// (A -> A) -> A -> A
export const fix = <A>(f: (_1: A) => A, a: A): A => f(a)
