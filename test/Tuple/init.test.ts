import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test init', function () {
	it('init([1, 2, 3]) should return [1, 2]', function () {
		const res = Tuple.init([1, 2, 3] as const)
		expect(res).to.eql([1, 2])
	})
	it('init([]) should return empty', function () {
		expect(Tuple.init([])).to.eql([])
	})
	it('init([1]) should return [1]', function () {
		expect(Tuple.init([1] as const)).to.eql([])
	})

	it('init return by value', function () {
		const t = [1, '2', 3, '4'] as const
		const inited = Tuple.init(t)

		expect(inited).to.eql([1, '2', 3])

		inited[0]++

		expect(inited).to.eql([2, '2', 3])
		expect(t).to.eql([1, '2', 3, '4'])
	})
})
