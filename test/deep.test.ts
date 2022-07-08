import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { copy } from '../src/tools/deep'

chai.use(chaiAsPromised)

describe('test copy', function () {
	it('copy simple case', function () {
		const test = {
			deep: {
				value: 1,
			},
		}

		const testCopy = copy(test)

		expect(testCopy).to.eql(test)
	})

	it('copy no deep reference', function () {
		const test = {
			deep: {
				value: 1,
			},
		}

		const testCopy = copy(test)

		test.deep.value = 2

		expect(testCopy.deep.value).to.eql(1)
	})

	it('copy with array', function () {
		const test = {
			deep: {
				value: 1,
				array: [
					{ obj: [{ bottom: 1 }, { bottom: 2 }] },
					{ something: [0, 1, 2] },
				],
			},
		}

		const testCopy = copy(test)

		expect(testCopy).to.eql(test)
	})

	it('copy with Date', function () {
		const test = {
			deep: {
				value: 1,
				array: [
					{ obj: [{ bottom: 1 }, { bottom: 2 }] },
					{ something: [0, 1, 2] },
				],
			},
			someDate: new Date(),
		}

		const testCopy = copy(test)

		expect(testCopy).to.eql(test)
	})

	it('copy with custom class', function () {
		class classTest {
			a: number
			b: number

			constructor(a: number, b: number) {
				this.a = a
				this.b = b
			}
		}

		const test = {
			deep: {
				value: 1,
				array: [
					{ obj: [{ bottom: 1 }, { bottom: 2 }] },
					{ something: [0, 1, 2] },
				],
			},
			someDate: new classTest(1, 2),
		}

		const testCopy = copy(test)

		expect(testCopy).to.eql(test)
	})
})
