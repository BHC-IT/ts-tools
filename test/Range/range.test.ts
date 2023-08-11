import { expect, describe, it } from 'vitest'
import { range } from '../../src/Range/range'

describe('test range', function () {
	it('range simple case', function () {
		const ranger = range()

		expect(ranger[10]).to.eql(10)
	})

	it('range increment by 2', function () {
		const ranger = range(0, Infinity, 2)

		expect(ranger[10]).to.eql(20)
	})

	it('range start at 10 increment by 2', function () {
		const ranger = range(10, Infinity, 2)

		expect(ranger[10]).to.eql(30)
	})

	it('range start at 10 stop at 100 increment by 2', function () {
		const ranger = range(10, 100, 2)

		expect(ranger[100]).to.eql(undefined)
	})

	it('range access unvalid index', function () {
		const ranger = range(10, 100, 2)

		expect((ranger as any).test).to.eql(undefined)
	})

	it('range access unvalid index', function () {
		const ranger = range(10, 100, 2)

		expect((ranger as any)[Symbol('test')]).to.eql(undefined)
	})
})
