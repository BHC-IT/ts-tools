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
*/
export const deepCopyArray = (arr : any[]) : any[] => {
	let copy = [];
	for (let i = 0, len = arr.length; i < len; i++) {
		copy[i] = deepCopy(arr[i]);
	}
	return copy;
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
*/
export const deepCopyObject = <T extends Object>(obj : T) : T => {
	let copy : T = Object.assign({}, obj);

	for (let attr in obj) {
		copy[attr] = deepCopy(obj[attr]);
	}
	return copy;
}

/**
	* This function copy a Date object.
	*
	* @param date		Date to copy.
	* @returns 		Copied Date.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const deepCopyDate = (date : Date) : Date => {
	let copy = new Date();
        copy.setTime(date.getTime());
        
        return copy;
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
export const deepCopy = (obj : any) : any => {

	if (obj === null || typeof obj === "undefined" || typeof obj !== "object") return obj;

	if (obj instanceof Date) {
		return deepCopyDate(obj);
	}

	if (obj instanceof Array) {
		return deepCopyArray(obj);
	}

	return deepCopyObject(obj);
}
