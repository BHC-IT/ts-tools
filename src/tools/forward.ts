export const forwardIf = <A extends any>(forward: A, pred: (a: A) => boolean, f: (a: A) => any) =>
	pred(forward) ? f(forward) : {};

export const forwardTern = <A extends any>(forward: A, pred: (a: A) => boolean, truthy: (a: A) => any, falsy: (a: A) => any) =>
	pred(forward) ? truthy(forward) : falsy(forward);

