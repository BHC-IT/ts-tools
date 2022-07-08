import { expect } from 'chai'

import { memoise } from '../src/index'

describe('test memoise', function () {
	it('memoise simple', function () {
		let callnb = 0
		const f = (a: number) => {
			callnb++
			return a * 2
		}
		const test = memoise(f)

		test(1)
		test(1)
		test(1)

		expect(test(1)).to.equal(2)
		expect(callnb).to.equal(1)

		test(2)

		expect(test(2)).to.equal(4)
		expect(callnb).to.equal(2)
	})

	it('memoise simple 2 params', function () {
		let callnb = 0
		const f = (a: number, b: number) => {
			callnb++
			return a + b
		}
		const test = memoise(f)

		test(1, 1)
		test(1, 1)
		test(1, 1)

		expect(test(1, 1)).to.equal(2)
		expect(callnb).to.equal(1)

		test(1, 2)
		expect(test(1, 2)).to.equal(3)
		expect(callnb).to.equal(2)

		test(2, 1)
		expect(test(2, 1)).to.equal(3)
		expect(callnb).to.equal(3)

		test(2, 2)
		expect(test(2, 2)).to.equal(4)
		expect(callnb).to.equal(4)

		expect(test(1, 1)).to.equal(2)
		expect(test(1, 2)).to.equal(3)
		expect(test(2, 1)).to.equal(3)
		expect(test(2, 2)).to.equal(4)
		expect(callnb).to.equal(4)
	})

	it('memoise complex 2 params', function () {
		let callnb = 0
		const f = (a: any, b: any) => {
			callnb++
			return a.test + b.test
		}
		const test = memoise(f)

		test({ test: 1 }, { test: 1 })
		test({ test: 1 }, { test: 1 })
		test({ test: 1 }, { test: 1 })

		expect(test({ test: 1 }, { test: 1 })).to.equal(2)
		expect(callnb).to.equal(1)

		test({ test: 1 }, { test: 2 })
		expect(test({ test: 1 }, { test: 2 })).to.equal(3)
		expect(callnb).to.equal(2)

		test({ test: 2 }, { test: 1 })
		expect(test({ test: 2 }, { test: 1 })).to.equal(3)
		expect(callnb).to.equal(3)

		test({ test: 2 }, { test: 2 })
		expect(test({ test: 2 }, { test: 2 })).to.equal(4)
		expect(callnb).to.equal(4)

		expect(test({ test: 1 }, { test: 1 })).to.equal(2)
		expect(test({ test: 1 }, { test: 2 })).to.equal(3)
		expect(test({ test: 2 }, { test: 1 })).to.equal(3)
		expect(test({ test: 2 }, { test: 2 })).to.equal(4)
		expect(callnb).to.equal(4)
	})
})
