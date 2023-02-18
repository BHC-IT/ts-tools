import { Last, maybe, either, Either } from '../index'

export const forward = <A, FS extends ((a: A) => unknown)[]>(
	forward: A,
	...fs: FS
): ReturnType<Last<FS>> =>
	fs.reduce((a, f) => f(forward), []) as ReturnType<Last<FS>>

export const forwardIf = <A, B>(
	forward: A,
	pred: (a: A) => boolean,
	f: (a: A) => B
): maybe.Maybe<B> => (pred(forward) ? maybe.just(f(forward)) : maybe.nothing)

export const forwardTern = <A, B, C>(
	forward: A,
	pred: (a: A) => boolean,
	truthy: (a: A) => B,
	falsy: (a: A) => C
): Either<C, B> =>
	pred(forward) ? either.right(truthy(forward)) : either.left(falsy(forward))

export const forwardIfAsync = async <A, B>(
	forward: A,
	pred: (a: A) => Promise<boolean>,
	f: (a: A) => B
): Promise<maybe.Maybe<B>> =>
	(await pred(forward)) ? maybe.just(f(forward)) : maybe.nothing

export const forwardTernAsync = async <A, B, C>(
	forward: A,
	pred: (a: A) => Promise<boolean>,
	truthy: (a: A) => B,
	falsy: (a: A) => C
): Promise<Either<C, B>> =>
	(await pred(forward))
		? either.right(truthy(forward))
		: either.left(falsy(forward))
