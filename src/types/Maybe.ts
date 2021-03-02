/**
	* This is the documentation for Maybe.ts
	*
	* usage exemple :
	* ```typescript
	* async function readDB() : Promise<Maybe<object>> {
	*	try {
	*		const response = await fetchSomethingInDB();
	*		return just(response);
	*	} catch (e : any) {
	*		return nothing;
	*	}
	* }
	*
	* async function main() : void {
	*	const maybeResponse = await readDB();
	*
	*	callMaybe((response : object) => ...).when.isJust(maybeResponse); // Callback in calMaybe will be called only if maybeResponse is a Just<object>.
	* }
	*
	* ```
	*
v	* @packageDocumentation
	* @module type/Maybe
	*
*/

/**
	* Nothing within the Maybe. Represent the absence of value.
	*
	*
	* @author Valentin Vivier <lanathlor>
*/
export interface Nothing {
	/**
		*
		*
		* @internal
	*/
	readonly _tag: 'nothing',
};

/**
	* A just value to be hold within a Maybe.
	*
	*
	* @template T		Type of value to hold.
	*
	* @author Valentin Vivier <lanathlor>
*/
export interface Just<T> {
	/**
		*
		*
		* @internal
	*/
	readonly _tag: 'just',

	/**
		*
		*
		* @internal
	*/
	readonly value: T,
};

/**
	* Hold a just value or nothing. used with {@link maybe}.
	*
	*
	* @template T		Type of value to hold if just.
	*
	* @author Valentin Vivier <lanathlor>
*/
export type Maybe<T> = Just<T> | Nothing;