import { expect } from 'chai'
require('mocha-sinon')

import { show, showf, showfAsync } from '../src/index'

describe('test show', function () {
	beforeEach(function () {
		this.sinon.stub(console, 'log')
	})

	it('show', function () {
		expect(show('test')).to.eql('test')
		expect((console.log as any).calledOnce).to.be.true
		expect((console.log as any).calledWith('test')).to.be.true
	})

	it('showf', function () {
		const test = showf((t: string) => t + 'test')

		expect(test('test')).to.eql('testtest')
		expect((console.log as any).calledTwice).to.be.true
		expect((console.log as any).calledWith('test')).to.be.true
	})

	it('showfAsync', async function () {
		const test = showfAsync(async (t: string) => t + 'test')

		expect(await test('test')).to.eql('testtest')
		expect((console.log as any).calledTwice).to.be.true
		expect((console.log as any).calledWith('test')).to.be.true
	})
})
