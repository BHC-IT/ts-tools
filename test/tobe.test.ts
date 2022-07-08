import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Observable, observe } from '../src/tools/observable'
import { tobe, lockFor } from '../src/tools/tobe'

chai.use(chaiAsPromised)

describe('test tobe', function () {
	it('tobe simple case', function (done) {
		const observable = new Observable(0)
		const time = Date.now()

		;(async () => {
			await tobe(observable, (v: number) => v === 5)

			const ellapsed = Date.now() - time
			expect(ellapsed >= 50 && ellapsed < 60).to.equal(true)
			expect(observable.get()).to.equal(5)
			done()
		})()

		setTimeout(() => observable.set(5), 50)
	})

	it('tobe true before call', function (done) {
		const observable = new Observable(0)
		const time = Date.now()

		;(async () => {
			await tobe(observable, (v: number) => v === 0)

			// must be here directly as no lock is declared
			const ellapsed = Date.now() - time
			expect(ellapsed >= 0 && ellapsed < 5).to.equal(true)
			expect(observable.get()).to.equal(0)
			done()
		})()

		setTimeout(() => observable.set(5), 50)
	})

	it('tobe falsy once', function (done) {
		const observable = new Observable(0)
		const time = Date.now()

		;(async () => {
			await tobe(observable, (v: number) => v === 5)

			const ellapsed = Date.now() - time
			expect(ellapsed >= 100 && ellapsed < 120).to.equal(true)
			expect(observable.get()).to.equal(5)
			done()
		})()

		setTimeout(() => {
			observable.set(1)
			setTimeout(() => observable.set(5), 50)
		}, 50)
	})

	it('tobe generator simple case', function (done) {
		const observable = new Observable(0)

		;(async () => {
			await tobe(observe(observable), (v: number) => v === 5)

			expect(observable.get()).to.equal(5)
			done()
		})()

		observable.set(5)
	})

	it('tobe generator falsy once', function (done) {
		const observable = new Observable(0)

		;(async () => {
			await tobe(observe(observable), (v: number) => v === 5)

			expect(observable.get()).to.equal(5)
			done()
		})()

		observable.set(1)
		setTimeout(() => observable.set(5), 50)
	})
})

describe('test lockFor', function () {
	it('lockFor simple case', function (done) {
		const time = Date.now()

		;(async () => {
			await lockFor(() => true)

			const ellapsed = Date.now() - time
			expect(ellapsed >= 50 && ellapsed < 60).to.equal(true)
			done()
		})()
	})

	it('lockFor falsy once', function (done) {
		let test = 0
		const time = Date.now()

		;(async () => {
			await lockFor(() => test === 2)

			const ellapsed = Date.now() - time
			expect(ellapsed >= 100 && ellapsed < 200).to.equal(true)
			expect(test).to.equal(2)
			done()
		})()

		setTimeout(() => {
			test = 1
			setTimeout(() => (test = 2), 50)
		}, 50)
	})

	it('lockFor fail', function (done) {
		const time = Date.now()

		;(async () => {
			const prom = lockFor(() => false, 10, 20)
			await expect(prom).to.be.rejectedWith(
				'lockFor : max recurse depleted'
			)

			const ellapsed = Date.now() - time
			expect(ellapsed >= 200 && ellapsed < 300).to.equal(true)
			done()
		})()
	})
})
