/**
 * This is the documentation for range.ts
 *
 * @packageDocumentation
 * @module range
 *
 */

/**
 * Generator function for range. yield every increment, from start to end.
 *
 * @param start		Range start at.
 * @param end		Range end at.
 * @param increment	Range jump by.
 * @returns 		Iterable representing the range.
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export function* rangeGenerator(
	start: number,
	end: number,
	increment: number
): IterableIterator<number> {
	for (let i = start; i <= end; i += increment) yield i
}

/**
 * Just a wrapper to convert the Iterable to a callable signature.
 *
 * @param start		Range start at.
 * @param end		Range end at.
 * @param increment	Range jump by.
 * @returns 		A function callable to retrieve next value.
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export const rangeFunctional = (
	start: number,
	end: number,
	increment: number
): (() => number) => {
	const ranger = rangeGenerator(start, end, increment)

	return (): number => ranger.next().value
}

/**
 * Create a range between 2 bornes with a regarde for the increment.
 * Return an array, with each index representing a point in the range.
 * The array start empty and is expended when necessary.
 * Do not work well with most array methods.
 *
 * @param start		Range start at. Default to 0.
 * @param end		Range end at. Default to Infinity.
 * @param increment	Range jump by. Default to 1.
 * @returns 		Array representing the range. (empty at start).
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export const range = (start = 0, end = Infinity, increment = 1): number[] => {
	const ranger = rangeFunctional(start, end, increment)

	const generationHandler = {
		get: function (arr: number[], prop: string | symbol) {
			if (typeof prop !== 'string') return undefined
			const nprop = Number(prop)
			while (nprop >= arr.length) {
				arr.push(ranger())
			}
			return arr[nprop]
		}
	}
	const p = new Proxy([] as number[], generationHandler)

	return p
}
