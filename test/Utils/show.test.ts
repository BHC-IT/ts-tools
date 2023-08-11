import { expect, describe, it, beforeEach, vi } from 'vitest'

import { show } from '../../src/Utils'

const spy = vi.spyOn(console, 'log')

describe('test show', function () {
	beforeEach(() => {
		spy.mockClear()
		spy.mockImplementation((): undefined => undefined)
	})
	it('show', function () {
		expect(show('test')).to.eql('test')
		expect(spy).toHaveBeenCalledOnce
		expect(spy).toHaveBeenCalledWith('test')
	})
})
