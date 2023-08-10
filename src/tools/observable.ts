/**
 * This is the documentation for observable.ts
 *
 * ```typescript
 *	const observable = new Observable(1); // create the observable on a number. Inital value set to 1.
 *
 *	const unsub = observable.listen((value: number) => { // add a listener to be called when observed value is changed (observable.set() is called).
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
 *	const unsub = observable.listen((value: number) => { // add a listener to be called when observed value is changed (observable.set() is called).
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
 * @typeParam T		Type holded by the observer.
 *
 * @author Valentin Vivier <lanathlor>
 */
export class Observable<T> {
	private _value: T
	private readonly _listener: ((a: T) => void)[] = []

	/**
	 * Constructor for observable.
	 *
	 * @param value		Initial value to observe.
	 * @typeParam T		Type holded by the observer.
	 *
	 * @public
	 */
	constructor(value: T) {
		this._value = value
	}

	/**
	 * Return currently hold value.
	 *
	 * @typeParam T	Type holded by the observer.
	 * @return 	Currently hold value.
	 *
	 * @public
	 */
	public get = (): T => this._value

	/**
	 * Change currently hold value.
	 *
	 * @param newValue		Value to set in the observer.
	 * @typeParam T			Type holded by the observer.
	 *
	 * @public
	 */
	public set = (newValue: T): this => {
		const oldValue = this._value

		if (this.willUpdate(oldValue, newValue) === false) return this

		this._value = newValue

		if (this.shouldCallListener(oldValue, newValue) === false) return this
		this._listener.forEach((f: (a: T) => void) => f?.(newValue))

		this.didUpdate(oldValue, newValue)

		return this
	}

	/**
	 * Listen for nay change in observed value. Callback is called each time value is changed.
	 *
	 * @param callback	Callback function called when the observed value change. Called with the new value as only parameter.
	 * @return 		A function to cancel this listener.
	 *
	 * @public
	 */
	public listen = (callback: (a: T) => void): (() => void) => {
		let i = (Math.random() * 100) | 0
		let mask = 1
		let tryied = 0

		while (this._listener[i]) {
			if (tryied === 5) {
				tryied = 0
				mask++
			}
			i = (Math.random() * Math.pow(100, mask)) | 0
			tryied++
		}

		this._listener[i] = callback
		return (): void => (this._listener[i] = null)
	}

	/**
	 * Async function that resolve as soon as the observed value is changed.
	 *
	 * @param timeout	Time before timeout is triggered. If 0, the function will not timeout. Default to 0.
	 * @param enforce	If true, timeout will throw with Error("Observable: Timeout on change"). If false, timeout will resolve with null. Default to false.
	 * @return 		The promise reolving on value change.
	 *
	 * @public
	 */
	public change = (timeout = 0, enforce = false): Promise<T | null> => {
		const promise = new Promise<T>(
			(resolve: (a: T) => void, reject: (e: Error) => void) => {
				const unsub = this.listen((value: T) => {
					unsub()

					resolve(value)
				})

				if (timeout) {
					setTimeout(() => {
						unsub()

						enforce
							? reject(new Error('Observable: Timeout on change'))
							: resolve(null)
					}, timeout)
				}
			}
		)

		return promise
	}

	/**
	 * Overloadable by extending {@link Observable}. Called before any change is made, can cancel update process.
	 *
	 * @param value		Current value hold by the observer.
	 * @param newValue	Value to set in the observer.
	 * @typeParam T		Type holded by the observer.
	 * @return 		If false is returned, change is cancel and listeners wont be called.
	 *
	 * @protected
	 */
	protected willUpdate: (a: T, b: T) => boolean = (): boolean => true

	/**
	 * Overloadable by extending {@link Observable}. Called after change is made.
	 *
	 * @param oldValue	Old value the observer holded.
	 * @param newValue	Current value hold by the observer.
	 * @typeParam T		Type holded by the observer.
	 * @return 		If false is returned, listeners will not be called.
	 *
	 * @protected
	 */
	protected shouldCallListener: (a: T, b: T) => boolean = (): boolean => true

	/**
	 * Overloadable by extending {@link Observable}. Called after change is made.
	 *
	 * @param oldValue	Old value the observer holded.
	 * @param newValue	Current value hold by the observer.
	 * @typeParam T		Type holded by the observer.
	 *
	 * @protected
	 */
	protected didUpdate: (a: T, b: T) => boolean = (): boolean => true
}

/**
 * Generator function to an {@link Observable}. Yielding on change made. Multiple change can occurs without the function noticing if happening between register.
 *
 * @param obs		Observer to await change on.
 * @param timeout	Time before timeout is triggered. If 0, the function will not timeout. Default to 0.
 * @param enforce	If true, timeout will throw with Error("Observable: Timeout on change"). If false, timeout will resolve with null. Default to false.
 * @typeParam T		Type holded by the observer.
 *
 * @author Valentin Vivier <lanathlor>
 */
export async function* observe<T>(
	obs: Observable<T>,
	timeout = 0,
	enforce = false
): AsyncIterableIterator<T> {
	while (true) yield await obs.change(timeout, enforce)
}
