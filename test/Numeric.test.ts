import { expect } from 'chai'

import { Numeric } from '../src/index'

describe('test Numeric', function () {
	it('Numeric.next', function () {
		expect(Numeric.next(1)).to.equal(2)
	})

	it('Numeric.prev', function () {
		expect(Numeric.prev(1)).to.equal(0)
	})

	it('Numeric.add', function () {
		expect(Numeric.add(1, 1)).to.equal(2)
	})

	it('Numeric.minus', function () {
		expect(Numeric.minus(3, 1)).to.equal(2)
	})

	it('Numeric.mult', function () {
		/*expect(Numeric.mult(1, 2)).to.equal(2);*/
	})

	it('Numeric.gt', function () {
		expect(Numeric.gt(1, 2)).to.equal(false)
	})

	it('Numeric.gte', function () {
		expect(Numeric.gte(1, 2)).to.equal(false)
	})

	it('Numeric.lt', function () {
		expect(Numeric.lt(1, 2)).to.equal(true)
	})

	it('Numeric.lte', function () {
		expect(Numeric.lte(1, 2)).to.equal(true)
	})

	it('Numeric.eql', function () {
		expect(Numeric.eql(1, 2)).to.equal(false)
	})
})
