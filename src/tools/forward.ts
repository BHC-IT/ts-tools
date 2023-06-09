import { Either } from "../effects/Either"
import { Maybe } from "../effects/Maybe"
import { Last } from "./last"

export const forward = <A, FS extends ((a: A) => unknown)[]>(forward: A, ...fs: FS): ReturnType<Last<FS>> =>
	fs.reduce((a, f) => f(forward), []) as ReturnType<Last<FS>>

export const forwardIf = <A, B>(forward: A, pred: (a: A) => boolean, f: (a: A) => B): Maybe<B> =>
	pred(forward) ? Maybe.just(f(forward)) : Maybe.nothing

export const forwardTern = <A, B, C>(forward: A, pred: (a: A) => boolean, truthy: (a: A) => B, falsy: (a: A) => C): Either<C, B> =>
	pred(forward) ? Either.right(truthy(forward)) : Either.left(falsy(forward))

export const forwardIfAsync = async <A, B>(forward: A, pred: (a: A) => Promise<boolean>, f: (a: A) => B): Promise<Maybe<B>> =>
	await pred(forward) ? Maybe.just(f(forward)) : Maybe.nothing

export const forwardTernAsync = async <A, B, C>(forward: A, pred: (a: A) => Promise<boolean>, truthy: (a: A) => B, falsy: (a: A) => C): Promise<Either<C, B>> =>
	await pred(forward) ? Either.right(truthy(forward)) : Either.left(falsy(forward))
