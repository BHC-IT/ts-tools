import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test last', function () {
	it('last([1, 2, 3]) should return 1', function () {
		const test = Tuple.last([1, 2, 3] as const)
		expect(test).to.equal(3)
	})
	it('last([]) should return empty', function () {
		expect(Tuple.last([])).to.eql([])
	})
})
