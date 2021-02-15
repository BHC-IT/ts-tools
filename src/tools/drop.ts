/**
	* This is the documentation for drop.ts
	* @packageDocumentation
	* @module drop
	*
*/

/**
	* Drop nb element of a tuple or array.
	*
	*
	* @param nb		nb element to drop.
	* @param t		Tuple or array to drop from.
	* @return Tuple or array of droped of nb element.
	*
	* @author Valentin Vivier <lanathlor>
*/

export const drop = (nb : number, t : any[]) => [...t].slice(nb, t.length);