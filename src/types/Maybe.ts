export interface Nothing {
	readonly _tag: 'nothing',
};

export interface Just<T> {
	readonly _tag: 'just',
	readonly value: T,
};

export type Maybe<T> = Just<T> | Nothing;