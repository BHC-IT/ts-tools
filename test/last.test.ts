import { expect } from 'chai'
import { last } from '../src/tools/last'

describe('test last', function () {
	it('last([1, 2, 3]) should return 1', function () {
		const test = last([1, 2, 3])

		expect(test).to.equal(3)
	})
	it('last([]) should return empty', function () {
		expect(last([])).to.equal(undefined)
	})
})
