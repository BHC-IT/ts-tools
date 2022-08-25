import { expect, describe, it } from 'vitest'

import { flipt, flip } from '../src/index'

const addstr = (str1: string, str2: string) => str1 + str2

const addflip = flip(addstr)

describe('test flipt', function () {
	it('flipt', function () {
		expect(flipt(['a', true, 1])).to.eql([1, true, 'a'])
	})
})

describe('test flip', function () {
	it('reverse(...) should return 1', function () {
		expect(addstr('a', 'b')).to.equal('ab')
		expect(addflip('a', 'b')).to.equal('ba')
	})
})
