/**
	* This is the documentation for range.ts
	*
	* @packageDocumentation
	* @module range
	*
*/

export function* rangeGenerator(start : number, end : number, increment : number) : IterableIterator<number> {
	for (let i = start; i <= end; i += increment) yield i;
}

export const rangeFunctional = (start : number, end : number, increment : number) : () => number => {
	const ranger = rangeGenerator(start, end, increment);

	return () : number => ranger.next().value;
}

export const range = (start : number = 0, end : number = Infinity, increment : number = 1) : number[] => {

	const ranger = rangeFunctional(start, end, increment);

	let generationHandler = {
		get: function(arr : number[], prop : number) {
			while (prop >= arr.length) {
				arr.push(ranger());
			}
			return arr[prop];
		},
	}
	let p = new Proxy([] as number[], generationHandler);

	return p;
}