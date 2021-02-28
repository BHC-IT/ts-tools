/**
	* This is the documentation for observable.ts
	*
	* ```typescript
	*	const observable = new Observable(1); // create the observable on a number. Inital value set to 1.
	*
	*	const unsub = observable.listen((value : number) => { // add a listener to be called when observed value is changed (observable.set() is called).
	*
	*		// value is equel to the new value of the observable. Here value === 2.
	*		// code
	*
	*	});
	*
	*	// code
	*
	*	observable.set(2); // set the value to 2. All listeners will be called.
	*
	*	// code
	*
	*	unsub(); // unsubscribe the function. The listener wont be called anymore
	* ```
	*
	* @packageDocumentation
	* @module observable
	*
*/

/**
	* Observable class. Usefull to make a variable calling asynchronous listener when changed.
	*
	* ```typescript
	*	const observable = new Observable(1); // create the observable on a number. Inital value set to 1.
	*
	*	const unsub = observable.listen((value : number) => { // add a listener to be called when observed value is changed (observable.set() is called).
	*
	*		// value is equel to the new value of the observable. Here value === 2.
	*		// code
	*
	*	});
	*
	*	// code
	*
	*	observable.set(2); // set the value to 2. All listeners will be called.
	*
	*	// code
	*
	*	unsub(); // unsubscribe the function. The listener wont be called anymore
	* ```
	*
	* @template T		Type holded by the observer.
	*
	* @author Valentin Vivier <lanathlor>
*/
export class Observable<T> {
	private _value : T;
	private readonly _listener : Function[] = [];

	/**
		* Constructor for observable.
		*
		* @param value		Initial value to observe.
		* @template T		Type holded by the observer.
		*
		* @public
		*
		* @author Valentin Vivier <lanathlor>
	*/
	constructor(value : T) {
		this._value = value;
	}

	/**
		* Return currently hold value.
		*
		* @template T	Type holded by the observer.
		* @return 	Currently hold value.
		*
		* @public
		*
		* @author Valentin Vivier <lanathlor>
	*/
	public get = () : T => this._value;

	/**
		* Change currently hold value.
		*
		* @param newValue		Value to set in the observer.
		* @template T			Type holded by the observer.
		*
		* @public
		*
		* @author Valentin Vivier <lanathlor>
	*/
	public set = (newValue : T) : this => {
		const oldValue = this._value;
		
		if (this.willUpdate(oldValue, newValue) === false)
			return this;

		this._value = newValue;

		this._listener.forEach((f : Function) => f?.(newValue));
		
		this.didUpdate(oldValue, newValue);

		return this;
	}

	/**
		* Return currently hold value.
		*
		* @param callback	Callback function called when the observed value change. Called with the new value as only parameter.
		* @return 		A function to cancel this listener.
		*
		* @public
		*
		* @author Valentin Vivier <lanathlor>
	*/
	public listen = (callback : Function) : Function => {
		let i = Math.random() * 10000 | 0;
		let mask = 1;
		let tryied = 0;

		while (this._listener[i]) {
			if (tryied === 5) {
				tryied = 0;
				mask++;
			}
			i = Math.random() * Math.pow(10000, mask) | 0;
			tryied++;
		}

		this._listener[i] = callback;
		return () : void => this._listener[i] = null;
	}

	/**
		* Overloadable by extending {@link Observable}. Called before any change is made, can cancel update process.
		*
		* @param value		Current value hold by the observer.
		* @param newValue	Value to set in the observer.
		* @template T		Type holded by the observer.
		* @return 		If false is returned, change is cancel and listeners wont be called.
		*
		* @protected
		*
		* @author Valentin Vivier <lanathlor>
	*/
	protected willUpdate = (value : T, newValue : T) : boolean => true;
	
	/**
		* Overloadable by extending {@link Observable}. Called after change is made.
		*
		* @param oldValue	Old value the observer holded.
		* @param newValue	Current value hold by the observer.
		* @template T		Type holded by the observer.
		*
		* @protected
		*
		* @author Valentin Vivier <lanathlor>
	*/
	protected didUpdate = (oldValue : T, newValue : T) : void => {};
} 