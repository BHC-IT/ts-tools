/**
	* This is the documentation for eql.ts
	* This module implement object and array deep (nested) equality.
	*
	* @packageDocumentation
	* @module eql
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
export const eqlArray = <T extends any[], U extends any[]>(arrLeft : T, arrRight : U) : boolean =>
	arrLeft.reduce((s : boolean, e : any, i : number) => s && eql(e, arrRight[i]), true);


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
export const eqlObj = <T extends object>(objLeft : T, objRight : T) : boolean =>
	(Object.keys(objLeft) as Array<keyof typeof objLeft>).reduce((s: boolean, e: keyof typeof objLeft) => s && eql(objLeft[e], objRight[e]), true);

/**
	* This function create a deep copy of any array based type, with any nesting construction.
	* May not support every type in the book. To test out.
	*
	* @param arr		Array to copy.
	* @returns 		Copied array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const eql = <T extends any, U extends any>(objLeft : T, objRight : U) : boolean => {

	if (typeof objLeft !== typeof objRight) return false;

	if (typeof objLeft !== "object") return objLeft === objRight;

	if (objLeft instanceof Array) return (objLeft.length === (objRight as any[]).length ? eqlArray(objLeft, objRight as any[]) : false);

	return eqlObj(objLeft as any, objRight);
}