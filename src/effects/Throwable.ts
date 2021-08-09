import { Effect } from './Effect';

import { emit } from '../tools/emit';
import { tail } from '../tools/tail';
import { forwardTern } from '../tools/forward';

type resolved<A> = [true, A];
type thrown<E extends Error> = [false, E];

type ErrTuple<A, E extends Error> = resolved<A> | thrown<E>;

const isResolved = <A, E extends Error>(e: ErrTuple<A, E>) : e is resolved<A> => e[0];

export class Throwable<A extends any> extends Effect<A> {
	private readonly record : ErrTuple<A, Error>

	private constructor(a: ErrTuple<A, Error>) {
		super();

		this.record = a;
	}

	public static fmap = <A extends any, B extends any>(f:(a: A) => B, a: Throwable<A>): Throwable<B> => isResolved(a.record) ? Throwable.resolved(f(a.fromResolved())) : new Throwable<B>(a.record)
	public fmap = <B extends any>(f:(a: A) => B): Throwable<B> => Throwable.fmap(f, this);

	public static from = <A extends any, E extends Error>(a: A | E): Throwable<A> => a instanceof Error ? Throwable.thrown(a) : Throwable.resolved(a)
	public static lift =  <A, B extends any>(f:(a: A) => B): ((a: Throwable<A>) => Throwable<B>) => (a: Throwable<A>) => Throwable.fmap(f, a)

	public identity = <T extends typeof Effect>(): T => Throwable as unknown as T

	public isValide = (): boolean => Throwable.isResolved(this);

	public static resolved = <A extends any>(a: A): Throwable<A> => new Throwable<A>([true, a]);

	public static thrown = <A extends any, E extends Error>(a: E | string): Throwable<A> => !(a instanceof Error) ? new Throwable<A>([false, new Error(a)]) : new Throwable<A>([false, a])

	public static isResolved = <A extends any>(a: Throwable<A>): boolean => isResolved(a.record);
	public isResolved = (): boolean => Throwable.isResolved(this);

	public static isThrown = <A extends any>(a: Throwable<A>): boolean => !Throwable.isResolved(a);
	public isThrown = (): boolean => !Throwable.isResolved(this);

	public static fromResolved = <A extends any>(a: Throwable<A>) : A => isResolved(a.record) ? a.record[1] : emit(a.record[1])
	public fromResolved = () : A => Throwable.fromResolved(this);

	public static fromThrown = <A extends any>(a: Throwable<A>) : Error => !isResolved(a.record) ? a.record[1] : emit('Throwable resolved')
	public fromThrown = () : Error => Throwable.fromThrown(this)

	public static fromThrowable = <A extends any>(d: A, a: Throwable<A>) : A => isResolved(a.record) ? a.fromResolved() : d
	public fromThrowable = (d: A) : A => Throwable.fromThrowable(d, this)

	public static listToThrowable = <A extends any>(a: A[]) : Throwable<A> => a.length === 0 ? Throwable.thrown(new Error('empty')) : Throwable.resolved(a[0]);

	public static ThrowableToList = <A extends any>(a: Throwable<A>) : A[] => isResolved(a.record) ? [a.fromResolved()] : []
	public ThrowableToList = () : A[] => Throwable.ThrowableToList(this)

	public static catThrowables = <A extends any>(a: Throwable<A>[]) : A[] =>
		[
			...(a.length && isResolved(a[0].record) ? [a[0].fromResolved()] : []),
			...(a.length ? Throwable.catThrowables(tail(a)) as A[] : [])
		]

	public static mapThrowable = <A, B extends any>(f:(a: A) => Throwable<B>, a: A[]) : B[] =>
		[
			...(a.length ? forwardTern(f(a[0]), (b: Throwable<B>) => isResolved(b.record), (b: Throwable<B>) => [Throwable.fromResolved(b)], () => []) : []),
			...(a.length ? Throwable.mapThrowable(f, tail(a)) : [])
		]


	public static liftFromThrowable = <A extends any, Args extends any[]>(f: ((...a: Args) => A)): ((...a: Args) => Throwable<A>) => (...a: Args) => {
		try {
			return Throwable.resolved(f(...a));
		} catch (e) {
			return Throwable.thrown(e)
		}
	}

	public static liftFromThrowableAsync = <A extends any, Args extends any[]>(f: ((...a: Args) => Promise<A>)): ((...a: Args) => Promise<Throwable<A>>) => async (...a: Args) => {
		try {
			return Throwable.resolved(await f(...a));
		} catch (e) {
			return Throwable.thrown(e)
		}
	}

	public static case = <A, B>(a: Throwable<A>, f: (a: A) => B, n: (e: Error) => B) => isResolved(a.record) ? f(a.fromResolved()) : n(a.fromThrown())
	public case = <B>(f: (a: A) => B, n: (e: Error) => B) => Throwable.case(this, f, n)
}