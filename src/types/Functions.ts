import { Effect } from '../effects/Effect'

export type Func = (...args: unknown[]) => unknown

export type F<A, B> = (...args: A[]) => B

export type Void<A> = (...args: A[]) => void

export type PureFunction<A> = (_1: A) => A

export type Program<A, B> = (_1: A) => B

export type EffectfulProgram<A, B> = (_1: A) => Effect<B>
