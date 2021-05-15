/**
	* This is the documentation for eql.ts
	* This module implement object and array deep (nested) equality.
	*
	* @packageDocumentation
	* @module eql
	*
*/



/**
	* This function deep compare two array.
	*
	* @param arrLeft	First array to compare.
	* @param arrRight	Second array to compare.
	* @returns 		True if arrays match, false otherwise.
	*
	* @author Valentin Vivier <lanathlor>
	* @internal
*/
export const eqlArray = <T extends any[], U extends any[]>(arrLeft : T, arrRight : U) : boolean =>
	arrLeft.reduce((s : boolean, e : any, i : number) => s && eql(e, arrRight[i]), true);


/**
	* This function deep compare two object.
	*
	* @param objLeft	First object to compare.
	* @param objRight	Second object to compare.
	* @returns 		True if arrays match, false otherwise.
	*
	* @author Valentin Vivier <lanathlor>
	* @internal
*/
export const eqlObj = <T extends object>(objLeft : T, objRight : T) : boolean =>
	(Object.keys(objLeft) as Array<keyof typeof objLeft>).reduce((s: boolean, e: keyof typeof objLeft) => s && eql(objLeft[e], objRight[e]), true);

/**
	* This function deep compare anything.
	*
	* @param objLeft	First things to compare.
	* @param objRight	Second things to compare.
	* @returns 		True if arrays match, false otherwise.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const eql = <T extends any, U extends any>(objLeft : T, objRight : U) : boolean => {

	if (typeof objLeft !== typeof objRight) return false;

	if (typeof objLeft !== "object") return objLeft === objRight;

	if (objLeft instanceof Array) return (objLeft.length === (objRight as any[]).length ? eqlArray(objLeft, objRight as any[]) : false);

	return eqlObj(objLeft as any, objRight);
}