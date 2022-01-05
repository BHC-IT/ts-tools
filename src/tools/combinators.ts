
// A -> A
export const identity = <A>(a: A): A => a

// A -> B -> A
export const constant = <A, B>(a: A, b: B): A => a

// (A -> B) -> A -> B
export const apply = <A, B, F extends (_1: A) => B>(f:F, a: A): B => f(a)

// A -> (A -> B) -> B
export const thrust = <A, B, F extends (_1: A) => B>(a: A, f:F): B => f(a)

// (A -> A -> B) -> A -> B
export const duplication = <A, B, F extends (_1: A, _2: A) => B>(f: F, a: A): B => f(a, a)

// (A -> B -> C) -> B -> A -> C
export const flip = <A, B, C, F extends (_1: A, _2: B) => C>(f: F, b: B, a: A): C => f(a, b)

// (B -> C) -> (A -> B) -> A -> C
export const compose2 = <A, B, C, F extends (_1: B) => C, G extends (_1: A) => B >(f: F, g: G, a: A): C => f(g(a))

// (A -> B -> C) -> (A -> B) -> A -> C
export const substitution = <A, B, C, F extends (_1: A, _2: B) => C, G extends (_1: A) => B>(f: F, g: G, a: A): C => f(a, g(a))

// (A -> B -> C) -> (B -> A) -> B -> C
export const chain = <A, B, C, F extends (_1: A, _2: B) => C, G extends (_1: B) => A>(f: F, g: G, b: B): C => f(g(b), b)

// (B -> C -> D) -> (A -> B) -> (A -> C) -> A -> D
export const converge = <A, B, C, D, F extends (_1: B, _2: C) => D, G extends (_1: A) => B, H extends (_1: A) => C>(f: F, g: G, h: H, a: A): D => f(g(a), h(a))

// (B -> B -> C) -> (A -> B) -> A -> A -> C
export const psi = <A, B, C, F extends (_1: B, _2: B) => C, G extends (_1: A) => B>(f: F, g: G, a1: A, a2: A): C => f(g(a1), g(a2))

// (A -> A) -> A -> A
export const fix = <A, F extends (_1: A) => A>(f: F, a: A): A => f(a)
