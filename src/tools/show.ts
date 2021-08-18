export const show = <T extends any>(a: T): T => {console.log(a); return a}

export const showf = <A extends any[], B extends any>(f: ((...a: A) => B)): ((...a: A) => B) => (...a: A) : B => {
	console.log(...a);
	return show(f(...a));
}

export const showfAsync = <A extends any[], B extends any>(f: ((...a: A) => Promise<B>)): ((...a: A) => Promise<B>) => async (...a: A) : Promise<B> => {
	console.log(...a);
	return show(await f(...a));
}
