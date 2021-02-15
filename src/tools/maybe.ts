/**
	* This is the documentation for maybe.ts
	* @packageDocumentation
	* @module maybe
	*
*/

import type { Maybe } from '../types/Maybe';
import { Just, Nothing } from '../types/Maybe';

/**
	* Create a just<T> variable.
	*
	*
	* @param a		Value of the just variable to create.
	* @template T		Type of the just variable.
	* @return a : Just<T> as Maybe<T>.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const just = <T>(a: T) : Maybe<T> => ({_tag: 'just', value: a});

/**
	* Used to instanciate a Maybe<any> as nothing.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const nothing : Nothing = {_tag:'nothing'};


/**
	* Check if a Maybe<T> is a Just<T>.
	*
	*
	* @param a		Maybe<T> value to check.
	* @template T		Type of the just variable.
	* @return Return true if a hold just<T>, false otherwise.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const isJust = <T>(a: Maybe<T>): a is Just<T> => a._tag === 'just';

/**
	* Check if a Maybe<T> is a Nothing.
	*
	*
	* @param a		Maybe<T> value to check.
	* @template T		Type of the just variable.
	* @return Return true if a hold nothing, false otherwise.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const isNothing = <T>(a: Maybe<T>): a is Nothing => a._tag === 'nothing';


/**
	* Create a callable instance. included in { call } from '@bhc/tool-ts'.
	*
	*
	* @param f		Callback.
	* @return Return a callable instance with a when subfield.
	* @exemple ```ts
		const res = callMaybe((e : number) => e + 1).when.isJust(just(0)); //  e evaluate to 0. res evaluate to 0 + 1 => 1.
		const res = callMaybe((e : number) => e + 1).when.isJust(nothing); // callback is not called. res evaluate to nothing.
		```
	*
	* @author Valentin Vivier <lanathlor>
*/
export const callMaybe = (f : Function) => {
	return {
		when: {
			/**
				* Check if a Maybe<T> is a Just<T> and call f if so.
				*
				*
				* @param v		Maybe<T> value to check.
				* @template T		Type of the just variable.
				* @return Return the value return by the f function if v is just. Nothing otherwise.
				*
				* @author Valentin Vivier <lanathlor>
			*/
			isJust: <T>(v: Maybe<T>) => isJust(v) ? f(v.value) : nothing,

			/**
				* Check if a Maybe<T> is a Nothing and call f if so.
				*
				*
				* @param f		Maybe<T> value to check.
				* @template T		Type of the just variable.
				* @return Return the value return by the f function if v is nothing. Value of v otherwise.
				*
				* @author Valentin Vivier <lanathlor>
			*/
			isNothing: <T>(v: Maybe<T>) => isNothing(v) ? f() : v.value,
		}
	}
}
