import { expect, describe, it } from 'vitest'

import { Tuple } from '../../src'

describe('test flip', function () {
	it('flip', function () {
		expect(Tuple.flip(['a', true, 1] as const)).to.eql([1, true, 'a'])
	})
})
