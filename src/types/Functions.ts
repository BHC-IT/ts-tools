import { Effect } from '../effects/Effect';

export type Func = (...args: any) => any

export type F<A extends any[], B> = (...args: A) => B

export type Void = (...args: any[]) => void

export type PureFunction<A> = (_1: A) => A

export type Program<A, B> = (_1: A) => B

export type EffectfulProgram<A, B> = (_1: A) => Effect<B>
