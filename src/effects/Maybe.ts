import { Effect } from './Effect';

import { emit } from '../tools/emit';
import { tail } from '../tools/tail';
import { forwardTern } from '../tools/forward';

export interface Nothing {
	readonly _tag: 'nothing',
};

export interface Just<T> {
	readonly _tag: 'just',

	readonly value: T,
};

export type MaybeRecord<T> = Just<T> | Nothing;


const isJust = <T>(a: MaybeRecord<T>): a is Just<T> => a._tag === 'just';

export class Maybe<A extends any> extends Effect<A> {
	private readonly record : Just<A> | Nothing

	private constructor(a: Just<A> | Nothing) {
		super();
		this.record = a;
	}

	public static fmap = <A extends any, B extends any>(f:(a: A) => B, a: Maybe<A>): Maybe<B> => isJust(a.record) ? Maybe.from(f(a.record.value)) : Maybe.nothing
	public fmap = <B extends any>(f:(a: A) => B): Maybe<B> => Maybe.fmap(f, this);

	public static from = <A extends any>(a: A): Maybe<A> => Maybe.nothing === a || a === null || a === undefined ? Maybe.nothing : Maybe.just(a)

	public static lift =  <A, B extends any>(f:(a: A) => B): ((a: Maybe<A>) => Maybe<B>) => (a: Maybe<A>) => Maybe.fmap(f, a)

	public identity = <T extends typeof Effect>(): T => Maybe as unknown as T;

	public static just = <A extends any>(a: A): Maybe<A> => new Maybe<A>({_tag: 'just', value: a});

	public static nothing = new Maybe<never>({_tag: 'nothing'});

	public static isJust = <A extends any>(a: Maybe<A>): boolean => a.record._tag === 'just';
	public isJust = (): boolean => Maybe.isJust(this);

	public static isNothing = <A extends any>(a: Maybe<A>): boolean => a.record._tag === 'nothing';
	public isNothing = (): boolean => Maybe.isNothing(this);

	public static fromJust = <A extends any>(a: Maybe<A>) : A => isJust(a.record) ? a.record.value : emit("Error: Maybe opened on nothing")
	public fromJust = () : A => Maybe.fromJust(this);

	public static fromMaybe = <A extends any>(d: A, a: Maybe<A>) : A => isJust(a.record) ? a.record.value : d
	public fromMaybe = (d: A) : A => Maybe.fromMaybe(d, this);

	public static listToMaybe = <A extends any>(a: A[]) : Maybe<A> => a.length === 0 ? Maybe.nothing : Maybe.just(a[0]);

	public static maybeToList = <A extends any>(a: Maybe<A>) : A[] => isJust(a.record) ? [a.record.value] : [];
	public maybeToList = () : A[] => Maybe.maybeToList(this);

	public static catMaybes = <A extends any>(a: Maybe<A>[]) : A[] =>
		[
			...(a.length && isJust(a[0].record) ? [a[0].record.value] : []),
			...(a.length ? Maybe.catMaybes(tail(a)) as A[] : [])
		]

		/* todo with forwardTernary */
	public static mapMaybe = <A, B extends any>(f:(a: A) => Maybe<B>, a: A[]) : B[] =>
		[
			...(a.length ? forwardTern(f(a[0]), (b: Maybe<B>) => isJust(b.record), (b: Maybe<B>) => [Maybe.fromJust(b)], () => []) : []),
			...(a.length ? Maybe.mapMaybe(f, tail(a)) : [])
		]


	public static liftFromThrowable = <A extends any, Args extends any[]>(f: ((...a: Args) => A)): ((...a: Args) => Maybe<A>) => (...a: Args) => {
		try {
			return Maybe.just(f(...a));
		} catch {
			return Maybe.nothing
		}
	}

	public static liftFromThrowableAsync = <A extends any, Args extends any[]>(f: ((...a: Args) => Promise<A>)): ((...a: Args) => Promise<Maybe<A>>) => async (...a: Args) => {
		try {
			return Maybe.just(await f(...a));
		} catch {
			return Maybe.nothing
		}
	}

	public static case = <A, B>(a: Maybe<A>, f: (a: A) => B, n: () => B) => isJust(a.record) ? f(a.record.value) : n();
	public case = <B>(f: (a: A) => B, n: () => B) => Maybe.case(this, f, n);


}

