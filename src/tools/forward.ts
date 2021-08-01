export const forwardIf = <A extends any>(forward: A, pred: (a: A) => boolean, f: (a: A) => any) =>
	pred(forward) ? f(forward) : undefined;

export const forwardTern = <A extends any>(forward: A, pred: (a: A) => boolean, truthy: (a: A) => any, falsy: (a: A) => any) =>
	pred(forward) ? truthy(forward) : falsy(forward);

export const forwardIfAsync = async <A extends any>(forward: A, pred: (a: A) => Promise<boolean>, f: (a: A) => any) =>
	await pred(forward) ? f(forward) : undefined;

export const forwardTernAsync = async <A extends any>(forward: A, pred: (a: A) => Promise<boolean>, truthy: (a: A) => any, falsy: (a: A) => any) =>
	await pred(forward) ? truthy(forward) : falsy(forward);

