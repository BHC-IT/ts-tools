/**
	* This is the documentation for head.ts
	* @packageDocumentation
	* @module head
	*
*/

/**
	* Send back the type of the first element of the tuple or array.
	*
	*
	* @template T		Any kind of tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Head<T extends any[]> = T extends [head: infer U, ...tail: any[]] ? U : never;

/**
	* Send back a copy of the first element of the tuple or array.
	*
	*
	* @param tuple		Tuple or array to get head from.
	* @template T		Any kind of tuple or array.
	* @return First element of the tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const head = <T extends any[]>([head, ...tail] : [...T]) : Head<T> => head;
