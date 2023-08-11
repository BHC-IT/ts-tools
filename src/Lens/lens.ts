/**
 * This is the documentation for lens.ts
 *
 * @packageDocumentation
 * @module lens
 *
 */

import { copy } from '../Record/copy'

/**
 * Lens type for hard typing & "type safety".
 *
 *
 * @typeParam T		Type of the main object.
 * @typeParam U		Type of the field targeted by the lens.
 *
 * @author Valentin Vivier <lanathlor>
 */
export type Lens<T, U> = { get: (arg0: T) => U; set: (arg0: U, arg1: T) => T }

/**
 * Lens default 'constructor'.
 *
 * @param getter		Getter function.
 * @param setter		Setter function.
 * @returns 		Lens contructed with given parameters.
 * @typeParam T		Type of the main object.
 * @typeParam U		Type of the field targeted by the lens.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const lens = <T, U>(
	getter: (_1: T) => U,
	setter: (_1: U, _2: T) => T
): Lens<T, U> => ({
	get: (obj: T): U => getter(obj),
	set: (val: U, obj: T): T => setter(val, copy(obj))
})

/**
 * Lens 'kind of advance' contructor. Construct the lens from a given path.
 *
 * @param path		Path of the target. Can be a string, each subfield separated by a separator. Or a tuple of string and number representing subfield and indexes.
 * @param split		If path is a string, the separator will be call with string.split.
 * @returns 		Lens contructed with given parameters.
 * @typeParam T		Type of the main object.
 * @typeParam U		Type of the field targeted by the lens.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const lensFrom = <T, U>(
	path: string | (string | number)[],
	split = '.'
): Lens<T, U> => {
	let arrAccessor: (string | number)[]

	if (typeof path === 'string') arrAccessor = path.split(split)
	else arrAccessor = path

	const getter = (obj: T): U =>
		arrAccessor.reduce(
			(prev: { [key: string]: unknown }, currA: string) => prev?.[currA],
			obj
		) as U
	const setter = (value: U, obj: T): T => {
		arrAccessor.reduce(
			(prev: { [key: string]: unknown }, currA: string, i: number) => {
				if (prev === undefined) return undefined
				if (i === arrAccessor.length - 1 && prev[currA] !== null)
					prev[currA] = value
				return prev[currA]
			},
			obj
		)

		return obj
	}

	return lens(getter, setter)
}

/**
 * Return the value of the target field by the lens from the object.
 *
 * @param _lens		Lens to use.
 * @param obj		Object to apply the lens on.
 * @returns 		The targeted value.
 * @typeParam T		Type of the main object.
 * @typeParam U		Type of the field targeted by the lens.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const view = <T, U>(_lens: Lens<T, U>, obj: T): U => _lens.get(obj)

/**
 * Create a copy of the object and apply the lens on it to change the targeted value. Doesn't mutate.
 *
 * @param _lens		Lens to use.
 * @param value		Value to set the target to.
 * @param obj		Object to apply the lens on.
 * @returns 		The new object created with its targeted field value changed.
 * @typeParam T		Type of the main object.
 * @typeParam U		Type of the field targeted by the lens.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const set = <T, U>(_lens: Lens<T, U>, value: U, obj: T): T =>
	_lens.set(value, obj)
