export type Func = (...args: unknown[]) => unknown

export type F<A, B> = (...args: A[]) => B

export type Void<A> = (...args: A[]) => void

export type PureFunction<A> = (_1: A) => A

export type Program<A, B> = (_1: A) => B
