import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test tail', function () {
	it('tail([1, 2, 3]) should return [2, 3]', function () {
		expect(Tuple.tail([1, 2, 3] as const)).to.eql([2, 3])
	})
	it('tail([]) should return empty', function () {
		expect(Tuple.tail([])).to.eql([])
	})
	it('tail([1]) should return empty', function () {
		expect(Tuple.tail([1] as const)).to.eql([])
	})

	it('tail return by value', function () {
		const test = [1, 2, 3, 4] as const
		const tailed = Tuple.tail(test)

		expect(tailed).to.eql([2, 3, 4])

		tailed[1]++

		expect(tailed).to.eql([2, 4, 4])
		expect(test).to.eql([1, 2, 3, 4])
	})
})
