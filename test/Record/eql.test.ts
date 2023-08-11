import { expect, describe, it } from 'vitest'

import { eql } from '../../src/Record/eql'

describe('test eql', function () {
	it('eql(1, 1) to equal true', function () {
		const res = eql(1, 1)

		expect(res).to.equal(true)
	})

	it('eql(0, 1) to equal false', function () {
		const res = eql(0, 1)

		expect(res).to.equal(false)
	})

	it('eql(0, {value: 0}) to equal false', function () {
		const res = eql(0, { value: 0 })

		expect(res).to.equal(false)
	})

	it('eql(0, "0") to equal false', function () {
		const res = eql(0, '0')

		expect(res).to.equal(false)
	})

	it('eql("0", "0") to equal true', function () {
		const res = eql('0', '0')

		expect(res).to.equal(true)
	})

	it('eql(["0"], ["0"]) to equal true', function () {
		const res = eql(['0'], ['0'])

		expect(res).to.equal(true)
	})

	it('eql(["1"], ["0"]) to equal false', function () {
		const res = eql(['1'], ['0'])

		expect(res).to.equal(false)
	})

	it('eql([0, 1], [0]) to equal false', function () {
		const res = eql([0, 1], [0])

		expect(res).to.equal(false)
	})

	it('eql([0], [0, 1]) to equal false', function () {
		const res = eql([0], [0, 1])

		expect(res).to.equal(false)
	})

	it('eql(["1", [0]], ["0", [0]]) to equal false', function () {
		const res = eql(['1', [0]], ['0', [0]])

		expect(res).to.equal(false)
	})

	it('eql(["0", [0]], ["0", [0]]) to equal true', function () {
		const res = eql(['0', [0]], ['0', [0]])

		expect(res).to.equal(true)
	})

	it('eql({value: 1}, {value: 1}) to equal true', function () {
		const res = eql({ value: 1 }, { value: 1 })

		expect(res).to.equal(true)
	})

	it('eql({value: 1}, {value: 0}) to equal false', function () {
		const res = eql({ value: 1 }, { value: 0 })

		expect(res).to.equal(false)
	})

	it('eql({value: [0, 1], test:"ok"}, {value: [0, 1], test:"ok"}) to equal true', function () {
		const res = eql(
			{ value: [0, 1], test: 'ok' },
			{ value: [0, 1], test: 'ok' }
		)

		expect(res).to.equal(true)
	})

	it('eql({value: [0, 2], test:"ok"}, {value: [0, 1], test:"ok"}) to equal false', function () {
		const res = eql(
			{ value: [0, 2], test: 'ok' },
			{ value: [0, 1], test: 'ok' }
		)

		expect(res).to.equal(false)
	})

	it('test with same interface', function () {
		interface ITest {
			fieldOne: number
			fieldTwo: string
		}

		const test1: ITest = {
			fieldOne: 0,
			fieldTwo: 'ok',
		}

		const test2: ITest = {
			fieldOne: 0,
			fieldTwo: 'ok',
		}

		const res = eql(test1, test2)

		expect(res).to.equal(true)
	})

	it('test with same interface', function () {
		interface ITest {
			fieldOne: number
			fieldTwo: string
		}

		const test1: ITest = {
			fieldOne: 0,
			fieldTwo: 'ok',
		}

		const test2: ITest = {
			fieldOne: 1,
			fieldTwo: 'ok',
		}

		const res = eql(test1, test2)

		expect(res).to.equal(false)
	})

	it('test with diff interface', function () {
		interface ITest {
			fieldOne: number
			fieldTwo: string
		}

		interface ITest2 {
			field3: number
			field4: string
		}

		const test1: ITest = {
			fieldOne: 0,
			fieldTwo: 'ok',
		}

		const test2: ITest2 = {
			field3: 0,
			field4: 'ok',
		}

		const res = eql(test1, test2)

		expect(res).to.equal(false)
	})
})
