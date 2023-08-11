/**
 * @description
 * identity :: a -> a
 * A function that returns the value passed in.
 * @example
 * identity(1) // 1
 * identity('a') // 'a'
 * @param a The value to return.
 * @returns The value passed in.
 */
export const identity = <A>(a: A): A => a

/**
 * @description
 * constant :: a -> b -> a
 * A function that returns the first value passed in.
 * @example
 * constant(1, 2) // 1
 * constant('a', 'b') // 'a'
 * @param a The first value to return.
 * @returns The first value passed in.
 */
export const constant: <A, B>(a: A, b: B) => A = <A>(a: A): A => a

/**
 * @description
 * apply :: (a -> b) -> a -> b
 * A function that applies the function passed in to the value passed in.
 * @example
 * apply(x => x + 1, 1) // 2
 * apply(x => x + 1, 'a') // 'a1'
 * @param f The function to apply to the value passed in.
 * @param a The value to apply the function to.
 * @returns The result of applying the function to the value.
 */
export const apply = <A, B>(f: (a: A) => B, a: A): B => f(a)

/**
 * @description
 * thrush :: a -> (a -> b) -> b
 * A function that applies the function passed in to the value passed in.
 * @example
 * thrush(1, x => x + 1) // 2
 * thrush('a', x => x + 1) // 'a1'
 * @param a The value to apply the function to.
 * @param f The function to apply to the value passed in.
 * @returns The result of applying the function to the value.
 * @alias apply
 * @see apply
 */
export const thrust = <A, B>(a: A, f: (_1: A) => B): B => f(a)

/**
 * @description
 * duplication :: (a -> a -> b) -> a -> b
 * A function that applies the function passed in to the value passed in twice.
 * @example
 * duplication((x, y) => x + y, 1) // 2
 * duplication((x, y) => x + y, 'a') // 'aa'
 * @param f The function to apply to the value passed in.
 * @param a The value to apply the function to.
 * @returns The result of applying the function to the value.
 */
export const duplication = <A, B>(f: (_1: A, _2: A) => B, a: A): B => f(a, a)

/**
 * @description
 * flip :: (a -> b -> c) -> b -> a -> c
 * A function that flips the order of the arguments passed in.
 * @example
 * flip((x, y) => x + y, 1, 2) // 3
 * flip((x, y) => x + y, 'a', 'b') // 'ba'
 * @param f The function to flip the arguments of.
 * @param b The second argument to the function.
 * @param a The first argument to the function.
 * @returns The result of applying the function to the arguments.
 */
export const flip = <A, B, C>(f: (_1: A, _2: B) => C, b: B, a: A): C => f(a, b)

/**
 * @description
 * compose2 :: (b -> c) -> (a -> b) -> a -> c
 * A function that composes two functions.
 * @example
 * compose2(x => x + 1, x => x + 1, 1) // 3
 * compose2(x => x + 1, x => x + 1, 'a') // 'a11'
 * @param f The first function to compose.
 * @param g The second function to compose.
 * @param a The value to apply the functions to.
 * @returns The result of applying the functions to the value.
 */
export const compose2 = <A, B, C>(f: (_1: B) => C, g: (_1: A) => B, a: A): C =>
	f(g(a))

/**
 * @description
 * substitution :: (a -> b -> c) -> (a -> b) -> a -> c
 * A function that applies the function passed in to the value passed in.
 * @example
 * substitution((x, y) => x + y, x => x + 1, 1) // 3
 * substitution((x, y) => x + y, x => x + 1, 'a') // 'a1a'
 * @param f The function to apply to the value passed in.
 * @param g The function to apply to the value passed in.
 * @param a The value to apply the functions to.
 * @returns The result of applying the functions to the value.
 */
export const substitution = <A, B, C>(
	f: (_1: A, _2: B) => C,
	g: (_1: A) => B,
	a: A
): C => f(a, g(a))

/**
 * @description
 * chain :: (a -> b -> c) -> (b -> a) -> b -> c
 * A function that applies the function passed in to the value passed in.
 * @example
 * chain((x, y) => x + y, x => x + 1, 1) // 3
 * chain((x, y) => x + y, x => x + 1, 'a') // 'a1a'
 * @param f The function to apply to the value passed in.
 * @param g The function to apply to the value passed in.
 * @param a The value to apply the functions to.
 * @returns The result of applying the functions to the value.
 */
export const chain = <A, B, C>(
	f: (_1: A, _2: B) => C,
	g: (_1: B) => A,
	b: B
): C => f(g(b), b)

/**
 * @description
 * converge :: (b -> c -> d) -> (a -> b) -> (a -> c) -> a -> d
 * A function that applies the function passed in to the value passed in.
 * @example
 * converge((x, y) => x + y, x => x + 1, x => x + 1, 1) // 4
 * converge((x, y) => x + y, x => x + 1, x => x + 1, 'a') // 'a11a'
 * @param f The function to apply to the value passed in.
 * @param g The function to apply to the value passed in.
 * @param h The function to apply to the value passed in.
 * @param a The value to apply the functions to.
 * @returns The result of applying the functions to the value.
 */
export const converge = <A, B, C, D>(
	f: (_1: B, _2: C) => D,
	g: (_1: A) => B,
	h: (_1: A) => C,
	a: A
): D => f(g(a), h(a))

/**
 * @description
 * psi :: (b -> b -> c) -> (a -> b) -> a -> a -> c
 * A function that applies the function passed in to the value passed in.
 * @example
 * psi((x, y) => x + y, x => x + 1, 1, 2) // 5
 * psi((x, y) => x + y, x => x + 1, 'a', 'b') // 'a1b1'
 * @param f The function to apply to the value passed in.
 * @param g The function to apply to the value passed in.
 * @param a1 The first value to apply the functions to.
 * @param a2 The second value to apply the functions to.
 * @returns The result of applying the functions to the value.
 */
export const psi = <A, B, C>(
	f: (_1: B, _2: B) => C,
	g: (_1: A) => B,
	a1: A,
	a2: A
): C => f(g(a1), g(a2))

/**
 * @description
 * fix :: (a -> a) -> a -> a
 * A function that applies the function passed in to the value passed in.
 * @example
 * fix(x => x + 1, 1) // 2
 * fix(x => x + 1, 'a') // 'a1'
 * @param f The function to apply to the value passed in.
 * @param a The value to apply the function to.
 * @returns The result of applying the function to the value.
 */
export const fix = <A>(f: (_1: A) => A, a: A): A => f(a)
