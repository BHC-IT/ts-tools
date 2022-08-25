import { expect, describe, it } from 'vitest'

import { Observable, observe } from '../src/tools/observable'

describe('test Observable', function () {
	it('Observable construct & get', function () {
		const observable = new Observable(1)

		expect(observable.get()).to.equal(1)
	})
	it('Observable construct & set & get', function () {
		const observable = new Observable(1)

		observable.set(2)
		expect(observable.get()).to.equal(2)
	})
	it('observable listen', async () => {
		const observable = new Observable(1)

		const prom = new Promise(resolve => {
			const unsub = observable.listen((value: number) => {
				expect(value).to.equal(2)

				unsub()
				resolve(undefined)
			})
		})

		observable.set(2)
		await prom
	})

	it('observable listen', async () => {
		const observable = new Observable(1)

		const unsub = observable.listen((value: number) => {
			expect(true).to.equal(false) // should not be called
		})
		await new Promise(resolve => {
			observable.listen((value: number) => {
				expect(value).to.equal(2)
			})
			unsub()
			observable.set(2)
			resolve(undefined)
		})
	})

	it('observable change', async () => {
		const observable = new Observable(0)

		const prom = new Promise(resolve => {
			;(async () => {
				const new_value = await observable.change()

				expect(new_value).to.equal(1)
				;(async () => {
					const new_value = await observable.change()

					expect(new_value).to.equal(2)
					;(async () => {
						const new_value = await observable.change()

						expect(new_value).to.equal(3)
						resolve(undefined)
					})()

					observable.set(3)
				})()

				observable.set(2)
			})()
		})

		observable.set(1)
		await prom
	})

	it('observable change timeout not enforced after 50ms~', async () => {
		const observable = new Observable(0)
		const time = Date.now()

		const new_value = await observable.change(50)
		const ellapse = Date.now() - time

		expect(ellapse >= 50 && ellapse < 100).to.equal(true)
		expect(new_value).to.be.null
	})

	it('observable change timeout enforced after 50ms~ with error', async () => {
		const observable = new Observable(0)

		const promise = observable.change(50, true)

		await expect(promise).rejects.toThrow('Observable: Timeout on change')
	})

	it('observable async for loop with observe', async () => {
		const observable = new Observable(0)
		let i = 1

		const prom = new Promise(resolve => {
			;(async () => {
				for await (let value of observe(observable)) {
					expect(value).to.equal(i)

					if (i === 3) {
						resolve(undefined)
						return
					}
					i++
				}
			})()
		})

		observable.set(1)
		setTimeout(() => {
			observable.set(2)
			setTimeout(() => {
				observable.set(3)
			}, 10)
		}, 10)
		await prom
	})

	it('observable async for loop with observe with timeout', async () => {
		const observable = new Observable(0)
		let i = 1

		const prom = new Promise(resolve => {
			;(async () => {
				try {
					for await (let value of observe(observable, 50, true)) {
						expect(value).to.equal(i)

						i++
					}
				} catch (e: any) {
					expect(e.message).to.equal('Observable: Timeout on change')
					expect(observable.get()).to.equal(3)
					resolve(undefined)
				}
			})()
		})

		observable.set(1)
		setTimeout(() => {
			observable.set(2)
			setTimeout(() => {
				observable.set(3)
			}, 10)
		}, 10)
		await prom
	})

	it('add too many listener', function () {
		const observable = new Observable(1)

		for (let i = 0; i != 20000; i++) {
			observable.listen((value: number) => {
				expect(true).to.equal(false)
			})
		}
	})
})

describe('test Observable extended', function () {
	class ObservableExtended extends Observable<number> {
		constructor(value: number) {
			super(value)
		}

		protected willUpdate = (value: number, newValue: number): boolean =>
			!(value === newValue)
		protected shouldCallListener = (
			value: number,
			newValue: number
		): boolean => !(newValue === 5)
	}

	it('First set should not update observer', async () => {
		const obs = new ObservableExtended(1)

		const prom = new Promise(resolve => {
			const unsub = obs.listen((value: number) => {
				expect(value).to.equal(2)

				unsub()
				resolve(undefined)
			})
		})

		obs.set(1)
		obs.set(2)
		await prom
	})
})
