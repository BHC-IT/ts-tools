import { expect, describe, it, beforeEach, vi } from 'vitest'

import { show, showAsync } from '../../src/Function'

const spy = vi.spyOn(console, 'log')

describe('test function show', function () {
	beforeEach(() => {
		spy.mockClear()
		spy.mockImplementation((): undefined => undefined)
	})

	it('show', function () {
		const test = show((t: string) => t + 'test')

		expect(test('test')).to.eql('testtest')
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(['test'])
	})

	it('showAsync', async function () {
		const test = showAsync(async (t: string) => t + 'test')

		expect(await test('test')).to.eql('testtest')
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith(['test'])
	})
})
