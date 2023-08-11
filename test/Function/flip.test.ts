import { expect, describe, it } from 'vitest'

import { flip } from '../../src/Function/flip'

const addstr = (str1: string, str2: string) => str1 + str2

const addflip = flip(addstr)

describe('test function flip', function () {
	it('reverse(...) should return 1', function () {
		expect(addstr('a', 'b')).to.equal('ab')
		expect(addflip('a', 'b')).to.equal('ba')
	})
})
