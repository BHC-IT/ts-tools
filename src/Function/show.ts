import { show as baseShow } from '../Utils/show'

export const show =
	<A extends unknown[], B>(f: (...a: A) => B): ((...a: A) => B) =>
	(...a: A): B => {
		baseShow(a)
		return baseShow(f(...a))
	}

export const showAsync =
	<A extends unknown[], B>(
		f: (...a: A) => Promise<B>
	): ((...a: A) => Promise<B>) =>
	async (...a: A): Promise<B> => {
		baseShow(a)
		return baseShow(await f(...a))
	}
