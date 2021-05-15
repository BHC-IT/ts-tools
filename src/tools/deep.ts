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
export const deepCopyArray = <T extends any[]>(arr : T) : T => {
	let copyArr = [];

	for (let i = 0, len = arr.length; i < len; i++) {
		copyArr[i] = copy(arr[i]);
	}

	return copyArr as T;
}

/**
	* This function create a deep copy of any object based type, with any nesting construction.
	* May not support every type in the book. To test out.
	*
	* @param obs		Object to copy.
	* @returns 		Copied object.
	* @template T		Object type to copy.
	*
	* @author Valentin Vivier <lanathlor>
	* @internal
*/
export const deepCopyObject = <T extends object>(obj : T) : T => {
	let copyObj : T = Object.assign({}, obj);

	for (let attr in obj) {
		copyObj[attr] = copy(obj[attr]);
	}

	return copyObj;
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
export const deepCopyDate = (date : Date) : Date => {
	let copyDate = new Date();

	copyDate.setTime(date.getTime());

	return copyDate;
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
export const copy = <T extends any>(obj : T) : T => {

	if (obj === null || typeof obj === "undefined" || typeof obj !== "object") return obj;

	if (obj instanceof Date) {
		return deepCopyDate(obj) as T;
	}

	if (obj instanceof Array) {
		return deepCopyArray(obj) as T;
	}

	return deepCopyObject(obj as any) as T;
}
