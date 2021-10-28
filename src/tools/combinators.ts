export const identity = <A>(a: A): A => a

export const constant = <A, B>(a: A, b: B): A => a

export const apply = <A, B, F extends (_1: A) => B>(f:F, a: A): B => f(a)

export const thrust = <A, B, F extends (_1: A) => B>(a: A, f:F): B => f(a)

export const duplication = <A, B, F extends (_1: A, _2: A) => B>(f: F, a: A): B => f(a, a)

export const flip = <A, B, C, F extends (_1: A, _2: B) => C>(f: F, b: B, a: A): C => f(a, b)

export const compose2 = <A, B, C, F extends (_1: B) => C, G extends (_1: A) => B >(f: F, g: G, a: A): C => f(g(a))

export const substitution = <A, B, C, F extends (_1: A, _2: B) => C, G extends (_1: A) => B>(f: F, g: G, a: A): C => f(a, g(a))

export const chain = <A, B, C, F extends (_1: A, _2: B) => C, G extends (_1: B) => A>(f: F, g: G, b: B): C => f(g(b), b)

export const converge = <A, B, C, D, F extends (_1: B, _2: C) => D, G extends (_1: A) => B, H extends (_1: A) => C>(f: F, g: G, h: H, a: A): D => f(g(a), h(a))

export const psi = <A, B, C, F extends (_1: B, _2: B) => C, G extends (_1: A) => B>(f: F, g: G, a1: A, a2: A): C => f(g(a1), g(a2))

export const fix = <A, F extends (_1: A) => A>(f: F, a: A): A => f(a)
