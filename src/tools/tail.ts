/**
	* This is the documentation for tail.ts
	* @packageDocumentation
	* @module tail
	*
*/

/**
	* Send back the type of the tuple or array without his first element.
	*
	*
	* @template T		Any kind of tuple or array.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

/**
	* Send back a copy of a tuple or array without his first element.
	*
	*
	* @param tuple		Tuple or array to cut.
	* @template T		Any kind of tuple or array.
	* @return Copy of the original tuple or array minus his first element.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const tail = <T extends any[]>([head, ...tail] : T) : Tail<T> => tail as Tail<T>;
