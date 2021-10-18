export const forward = <A>(forward: A, ...fs: ((a: A) => unknown)[]) =>
	fs.reduce((a, f) => f(forward), [])

export const forwardIf = <A, B>(forward: A, pred: (a: A) => boolean, f: (a: A) => B): B | undefined =>
	pred(forward) ? f(forward) : undefined

export const forwardTern = <A, B, C>(forward: A, pred: (a: A) => boolean, truthy: (a: A) => B, falsy: (a: A) => C): B | C =>
	pred(forward) ? truthy(forward) : falsy(forward)

export const forwardIfAsync = async <A, B>(forward: A, pred: (a: A) => Promise<boolean>, f: (a: A) => B): Promise<B | undefined> =>
	await pred(forward) ? f(forward) : undefined

export const forwardTernAsync = async <A, B, C>(forward: A, pred: (a: A) => Promise<boolean>, truthy: (a: A) => B, falsy: (a: A) => C): Promise<B | C | undefined> =>
	await pred(forward) ? truthy(forward) : falsy(forward)
