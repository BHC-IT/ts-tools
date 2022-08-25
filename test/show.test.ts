import { expect, describe, it, beforeEach, vi } from 'vitest'

import { show, showf, showfAsync } from '../src/index'

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

	it('showf', function () {
		const test = showf((t: string) => t + 'test')

		expect(test('test')).to.eql('testtest')
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith('test')
	})

	it('showfAsync', async function () {
		const test = showfAsync(async (t: string) => t + 'test')

		expect(await test('test')).to.eql('testtest')
		expect(spy).toHaveBeenCalledTimes(2)
		expect(spy).toHaveBeenCalledWith('test')
	})
})
