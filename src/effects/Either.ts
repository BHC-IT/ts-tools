import { Effect } from './Effect'

// import { forwardTern } from '../tools/forward'

type left<A> = [false, A]
type right<B> = [true, B]

type EitherType<A, B> = left<A> | right<B>

const isRight = <A, B>(e: EitherType<A, B>): e is right<B> => e[0]

export class Either<A, B> extends Effect<B> {
	private readonly record: EitherType<A, B>

	private constructor(a: EitherType<A, B>) {
		super()

		this.record = a
	}

	public static fmap = <A, B, C>(
		f: (a: B) => C,
		a: Either<A, B>
	): Either<A, C> =>
		isRight(a.record)
			? Either.right(f(a.record[1]))
			: new Either<A, C>(a.record)
	public fmap = <C>(f: (a: B) => C): Either<A, C> => Either.fmap(f, this)

	public static bind = <A, B, C>(
		f: (a: B) => Either<A, C>,
		a: Either<A, B>
	): Either<A, C> =>
		isRight(a.record) ? f(a.record[1]) : new Either<A, C>(a.record)
	public bind = <C>(f: (a: B) => Either<A, C>): Either<A, C> =>
		Either.bind(f, this)

	public static lift =
		<A, B, C>(f: (a: B) => C): ((a: Either<A, B>) => Either<A, C>) =>
		(a: Either<A, B>) =>
			Either.fmap(f, a)

	public identity = <T extends typeof Effect>(): T => Either as unknown as T

	public isValide = (): boolean => Either.isRight(this)

	public open = (): A | B => this.record[1]
	public _open = (): unknown => this.record[1]

	public static left = <A, B>(a: A): Either<A, B> =>
		new Either<A, B>([false, a])

	public static right = <A, B>(a: B): Either<A, B> =>
		new Either<A, B>([true, a])

	public static isLeft = <A, B>(a: Either<A, B>): boolean =>
		!Either.isRight(a)
	public isLeft = (): boolean => !Either.isRight(this)

	public static isRight = <A, B>(a: Either<A, B>): boolean =>
		isRight(a.record)
	public isRight = (): boolean => Either.isRight(this)

	public static fromLeft = <A, B>(d: A, a: Either<A, B>): A =>
		!isRight(a.record) ? a.record[1] : d
	public fromLeft = (d: A): A => Either.fromLeft(d, this)

	public static fromRight = <A, B>(d: B, a: Either<A, B>): B =>
		isRight(a.record) ? a.record[1] : d
	public fromRight = (d: B): B => Either.fromRight(d, this)

	public static either = <A, B, C>(
		f: (a: A) => C,
		g: (a: B) => C,
		a: Either<A, B>
	): C => (isRight(a.record) ? g(a.record[1]) : f(a.record[1]))
	public either = <C>(f: (a: A) => C, g: (a: B) => C): C =>
		Either.either(f, g, this)

	public static case = <A, B, C>(
		a: Either<A, B>,
		f: (a: A) => C,
		g: (a: B) => C
	): C => (isRight(a.record) ? g(a.record[1]) : f(a.record[1]))
	public case = <C>(f: (a: A) => C, g: (a: B) => C): C =>
		Either.case(this, f, g)

	public static liftFromThrowable =
		<A, B, Args extends unknown[]>(f: (...a: Args) => B) =>
		(...a: Args): Either<A, B> => {
			try {
				return Either.right(f(...a))
			} catch (e) {
				return Either.left(e)
			}
		}

	public static liftFromThrowableAsync =
		<A, B, Args extends unknown[]>(f: (...a: Args) => Promise<B>) =>
		async (...a: Args): Promise<Either<A, B>> => {
			try {
				return Either.right(await f(...a))
			} catch (e) {
				return Either.left(e)
			}
		}
}
