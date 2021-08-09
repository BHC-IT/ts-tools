export abstract class Effect<A extends any> {
	static fmap: <A extends any, B extends any>(f:(a: A) => B, a: Effect<A>) => Effect<B>
	abstract fmap: <B extends any>(f:(a: A) => B) => Effect<B>
	static from: <A extends any>(a: A) => Effect<A>
	static lift: <A, B extends any>(f: (a: A) => B) => (a: Effect<A>) => Effect<B>
	public identity = () => Effect
	abstract isValide: () => boolean
}

export type recordType<A extends Effect<A>> = A