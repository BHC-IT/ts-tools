import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test take', function () {
	it('take(1, [1,2,3,4]) should return [1]', function () {
		expect(Tuple.take(1, [1, 2, 3, 4] as const)).to.eql([1])
	})
	it('take(3, [1,2,3,4]) should return [1,2,3]', function () {
		expect(Tuple.take(3, [1, 2, 3, 4] as const)).to.eql([1, 2, 3])
	})
	it('take(5, [1,2,3,4]) should return [1,2,3,4]', function () {
		expect(Tuple.take(5, [1, 2, 3, 4] as const)).to.eql([1, 2, 3, 4])
	})
})
