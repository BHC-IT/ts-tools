import { expect, describe, it } from 'vitest'

import { Observable, observe } from '../src/tools/observable'
import { tobe, lockFor } from '../src/tools/tobe'

describe('test tobe', function () {
	it('tobe simple case', async () => {
		const observable = new Observable(0)
		const time = Date.now()

		const prom = new Promise(resolve => {
			;(async () => {
				await tobe(observable, (v: number) => v === 5)

				const ellapsed = Date.now() - time
				expect(ellapsed >= 50 && ellapsed < 60).to.equal(true)
				expect(observable.get()).to.equal(5)
				resolve(undefined)
			})()
		})

		setTimeout(() => observable.set(5), 50)
		await prom
	})

	it('tobe true before call', async () => {
		const observable = new Observable(0)
		const time = Date.now()

		const prom = new Promise(resolve => {
			;(async () => {
				await tobe(observable, (v: number) => v === 0)

				// must be here directly as no lock is declared
				const ellapsed = Date.now() - time
				expect(ellapsed >= 0 && ellapsed < 5).to.equal(true)
				expect(observable.get()).to.equal(0)
				resolve(undefined)
			})()
		})

		setTimeout(() => observable.set(5), 50)
		await prom
	})

	it('tobe falsy once', async () => {
		const observable = new Observable(0)
		const time = Date.now()

		const prom = new Promise(resolve => {
			;(async () => {
				await tobe(observable, (v: number) => v === 5)

				const ellapsed = Date.now() - time
				expect(ellapsed >= 100 && ellapsed < 120).to.equal(true)
				expect(observable.get()).to.equal(5)
				resolve(undefined)
			})()
		})

		setTimeout(() => {
			observable.set(1)
			setTimeout(() => observable.set(5), 50)
		}, 50)
		await prom
	})

	it('tobe generator simple case', async () => {
		const observable = new Observable(0)

		const prom = new Promise(resolve => {
			;(async () => {
				await tobe(observe(observable), (v: number) => v === 5)

				expect(observable.get()).to.equal(5)
				resolve(undefined)
			})()
		})

		observable.set(5)
		await prom
	})

	it('tobe generator falsy once', async () => {
		const observable = new Observable(0)

		const prom = new Promise(resolve => {
			;(async () => {
				await tobe(observe(observable), (v: number) => v === 5)

				expect(observable.get()).to.equal(5)
				resolve(undefined)
			})()
		})

		observable.set(1)
		setTimeout(() => observable.set(5), 50)
		await prom
	})
})

describe('test lockFor', function () {
	it('lockFor simple case', async () => {
		const time = Date.now()

		await lockFor(() => true)

		const ellapsed = Date.now() - time
		expect(ellapsed >= 50 && ellapsed < 60).to.equal(true)
	})

	it('lockFor falsy once', async () => {
		let test = 0
		const time = Date.now()

		const prom = new Promise(resolve => {
			;(async () => {
				await lockFor(() => test === 2)

				const ellapsed = Date.now() - time
				expect(ellapsed >= 100 && ellapsed < 200).to.equal(true)
				expect(test).to.equal(2)
				resolve(undefined)
			})()
		})

		setTimeout(() => {
			test = 1
			setTimeout(() => (test = 2), 50)
		}, 50)
		await prom
	})

	it('lockFor fail', async () => {
		const time = Date.now()

		const prom = lockFor(() => false, 10, 20)
		await expect(prom).rejects.toThrow('lockFor : max recurse depleted')

		const ellapsed = Date.now() - time
		expect(ellapsed >= 200 && ellapsed < 300).to.equal(true)
	})
})
