import { Effect } from './Effect';

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

	public static from = <A extends any>(a: A): Maybe<A> => Maybe.nothing === a ? Maybe.nothing : Maybe.just(a)

	public static lift =  <A, B extends any>(f:(a: A) => B): ((a: Maybe<A>) => Maybe<B>) => (a: Maybe<A>) => Maybe.fmap(f, a)

	public identity = <T extends typeof Effect>(): T => Maybe as unknown as T;

	public static just = <A extends any>(a: A): Maybe<A> => new Maybe<A>({_tag: 'just', value: a});

	public static nothing = new Maybe<any>({_tag: 'nothing'});

	public static isJust = <A extends any>(a: Maybe<A>): boolean => a.record._tag === 'just';

	public static isNothing = <A extends any>(a: Maybe<A>): boolean => a.record._tag === 'nothing';

}

