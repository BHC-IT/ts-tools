/**
	* This is the documentation for tobe.ts
	*
	* ```typescript
	*	const observable = new Observable(0);
	*
	*	(async () => {
	*
	*		// some code goes here
	*
	*		await tobe(observable, (v : number) => v === 5); // the observable that has to be, and the condition function.
	*
	*		// this code will be executed only when observale is set to 5.
	*
	*	})();
	*
	*	...
	*
	*	observable.set(5); // this will release the async lock 
	* ```
	*
	* @packageDocumentation
	* @module tobe
	*
*/

import { Observable } from './observable';

/**
	* This function will create a silent lock on an {@link Observable}, releasing only when the conditional function return true.
	*
	* @param obs		Either an {@link Observable} or an AsyncIterableIterator mainly created from with {@link observe}.
	* @param cond		Conditinal function.
	* @returns 		A void promise to release the await.
	* @template T		Type holded by the observer.
	*
	* @author Valentin Vivier <lanathlor>
*/
export const tobe = async <T>(obs : Observable<T> | AsyncIterableIterator<T>, cond : (arg1 : T) => boolean) : Promise<void> => {
	if (obs instanceof Observable) {
		while (true) {
			const newValue = await obs.change();
			if (cond(newValue))
				return;
		}
	} else {
		for await (let value of obs) {
			if (cond(value))
				return;
		}
	}
}