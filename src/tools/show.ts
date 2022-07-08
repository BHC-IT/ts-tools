/* eslint-disable */
export const show = <T>(a: T): T => {
	console.log(a)
	return a
}

export const showf =
	<A extends unknown[], B>(f: (...a: A) => B): ((...a: A) => B) =>
	(...a: A): B => {
		/* eslint-disable */
		console.log(...a)
		return show(f(...a))
	}

export const showfAsync =
	<A extends unknown[], B>(
		f: (...a: A) => Promise<B>
	): ((...a: A) => Promise<B>) =>
	async (...a: A): Promise<B> => {
		/* eslint-disable */
		console.log(...a)
		return show(await f(...a))
	}
