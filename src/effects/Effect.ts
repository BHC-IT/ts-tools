export abstract class Effect<A> {

	static fmap: <A, B>(f:(a: A) => B, a: Effect<A>) => Effect<B>
	abstract fmap: <B>(f:(a: A) => B) => Effect<B>
	static bind: <A, B>(f:(a: A) => Effect<B>, a: Effect<A>) => Effect<B>
	abstract bind: <B>(f:(a: A) => Effect<B>) => Effect<B>
	static from: <A>(a: A) => Effect<A>
	static lift: <A, B>(f: (a: A) => B) => (a: Effect<A>) => Effect<B>
	public identity = () => Effect
	abstract isValide: () => boolean
	abstract _open: () => unknown
}

export type recordType<A extends Effect<A>> = A