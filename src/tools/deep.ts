/**
 * This is the documentation for deep.ts
 * This module implement object and array deep (nested) manipulation.
 *
 * @packageDocumentation
 * @module deep
 *
 */

/**
 * This function create a deep copy of any array based type, with any nesting construction.
 * May not support every type in the book. To test out.
 *
 * @param arr		Array to copy.
 * @returns 		Copied array.
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export const deepCopyArray = <T extends unknown[]>(arr: [...T]): [...T] => {
	const copyArr = []

	for (let i = 0, len = arr.length; i < len; i++) {
		copyArr[i] = copy(arr[i])
	}

	return copyArr as [...T]
}

/**
 * This function create a deep copy of any object based type, with any nesting construction.
 * May not support every type in the book. To test out.
 *
 * @param obs		Object to copy.
 * @returns 		Copied object.
 * @typeParam T		Object type to copy.
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export const deepCopyObject = <T extends object>(obj: T): T => {
	const copyObj: T = Object.assign({}, obj)

	for (const attr in obj) {
		copyObj[attr] = copy(obj[attr])
	}

	return copyObj
}

/**
 * This function copy a Date object.
 *
 * @param date		Date to copy.
 * @returns 		Copied Date.
 *
 * @author Valentin Vivier <lanathlor>
 * @internal
 */
export const deepCopyDate = <T extends Date>(date: T): T => {
	const copyDate = new Date()

	copyDate.setTime(date.getTime())

	return copyDate as T
}

/**
 * This function create a deep copy of any variable, with any nesting construction.
 * May not support every type in the book. To test out.
 * Inspired by https://stackoverflow.com/a/28152032.
 *
 * @param obs		Object to copy.
 * @returns 		Copied object.
 *
 * @author Valentin Vivier <lanathlor>
 */
export const copy = <T>(obj: T): T => {
	if (obj === null || typeof obj === 'undefined' || typeof obj !== 'object')
		return obj

	if (obj instanceof Date) {
		return deepCopyDate(obj) as T
	}

	if (obj instanceof Array) {
		return deepCopyArray(obj) as unknown as T
	}

	return deepCopyObject(obj as unknown as object) as unknown as T
}
