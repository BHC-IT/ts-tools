import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test head', function () {
	it('head([1, 2, 3]) should return 1', function () {
		expect(Tuple.head([1, 2, 3] as const)).to.equal(1)
	})
	it('head([]) should return empty', function () {
		expect(Tuple.head([])).to.eql([])
	})
})
