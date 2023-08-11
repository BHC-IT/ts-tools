import { expect, describe, it } from 'vitest'

import { always } from '../../src/Function'

describe('test always', function () {
	it('always', function () {
		const alwOne = always(1)

		expect(alwOne()).to.equal(1)
	})
})
