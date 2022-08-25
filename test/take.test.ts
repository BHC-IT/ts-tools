import { expect, describe, it } from 'vitest'

import { take } from '../src/tools/take'

describe('test take', function () {
	it('take(1, [1,2,3,4]) should return [1]', function () {
		expect(take(1, [1, 2, 3, 4])).to.eql([1])
	})
	it('take(3, [1,2,3,4]) should return [1,2,3]', function () {
		expect(take(3, [1, 2, 3, 4])).to.eql([1, 2, 3])
	})
	it('take(5, [1,2,3,4]) should return [1,2,3,4]', function () {
		expect(take(5, [1, 2, 3, 4])).to.eql([1, 2, 3, 4])
	})
})
