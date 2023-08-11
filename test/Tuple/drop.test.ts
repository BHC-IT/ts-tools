import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test drop', function () {
	it('drop(1, [1,2,3,4]) should return [1]', function () {
		expect(Tuple.drop(1, [1, 2, 3, 4] as const)).to.eql([2, 3, 4])
	})
	it('drop(3, [1,2,3,4]) should return [1,2,3]', function () {
		expect(Tuple.drop(3, [1, 2, 3, 4] as const)).to.eql([4])
	})
	it('drop(5, [1,2,3,4]) should return [1,2,3,4]', function () {
		expect(Tuple.drop(5, [1, 2, 3, 4])).to.eql([])
	})
	it('drop(1, ["1",true,1]) should return [true,1]', function () {
		expect(Tuple.drop(1, ['1', true, 1] as const)).to.eql([true, 1])
	})
})
