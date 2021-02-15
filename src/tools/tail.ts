/**
	* This is the documentation for tail.ts
	* @packageDocumentation
	* @module tail
	*
*/

/**
	* Send back the type of the tuple without his first element.
	*
	*
	* @template T		Any kind of tuple or array
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

/**
	* Send back a copy of a tuple/array without his first element.
	*
	*
	* @param tuple		tuple to cut
	* @template T		Any kind of tuple or array
	* @return Copy of the original tuple minus his first element
	*
	* @author Valentin Vivier <lanathlor>
*/
export const tail = <T extends any[]>([head, ...tail] : T) : Tail<T> => tail as Tail<T>;
