/**
	* This is the documentation for take.ts
	* @packageDocumentation
	* @module take
	*
*/

/**
	* Take some element at the start of the tuple or array.
	*
	*
	* @param nb		nb elements to take at the start.
	* @param t		Tuple or array to take from.
	* @return return a copy of t containing only nb firsts elements.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const take = (nb : number, t : any[]) => t.slice(0, nb);