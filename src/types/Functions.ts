import { Effect } from '../effects/Effect';

export type Void = (..._1: any[]) => void

export type PureFonction<A> = (_1: A) => A

export type Program<A, B> = (_1: A) => B

export type EffectfulProgram<A, B> = (_1: A) => Effect<B>