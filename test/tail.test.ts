import { expect, describe, it } from 'vitest'

import { tail } from '../src/tools/tail'

describe('test tail', function () {
	it('tail([1, 2, 3]) should return [2, 3]', function () {
		expect(tail([1, 2, 3])).to.eql([2, 3])
	})
	it('tail([]) should return empty', function () {
		//@ts-ignore
		expect(tail([])).to.eql([])
	})
	it('tail([1]) should return empty', function () {
		expect(tail([1])).to.eql([])
	})

	it('tail return by value', function () {
		const test: [number, number, number, number] = [1, 2, 3, 4]
		const tailed = tail(test)

		expect(tailed).to.eql([2, 3, 4])

		test[1]++
		tailed[1]++

		expect(tailed).to.eql([2, 4, 4])
		expect(test).to.eql([1, 3, 3, 4])
	})
})
