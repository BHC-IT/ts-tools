import { expect, describe, it } from 'vitest'

import * as forward from '../../src/Function/forward'

describe('test forward', function () {
	it('forward', function () {
		let test = 0

		forward.forward(
			1,
			(i: number) => expect(i).to.equal(1),
			(i: number) => (test = i)
		)

		expect(test).to.equal(1)
	})

	it('forwardIf', function () {
		let test = 0
		let test2 = 0

		forward.forwardIf(
			1,
			(i: number) => i === 1,
			(i: number) => (test = i)
		)
		forward.forwardIf(
			2,
			(i: number) => i === 1,
			(i: number) => (test2 = i)
		)

		expect(test).to.equal(1)
		expect(test2).to.equal(0)
	})

	it('forwardTern', function () {
		let test = 0
		let test2 = 0

		forward.forwardTern(
			1,
			(i: number) => i === 1,
			(i: number) => (test = i),
			() => 0
		)
		forward.forwardTern(
			2,
			(i: number) => i === 1,
			() => 0,
			(i: number) => (test2 = i)
		)

		expect(test).to.equal(1)
		expect(test2).to.equal(2)
	})

	it('forwardIfAsync', async function () {
		let test = 0
		let test2 = 0

		await forward.forwardIfAsync(
			1,
			async (i: number) => i === 1,
			(i: number) => (test = i)
		)
		await forward.forwardIfAsync(
			2,
			async (i: number) => i === 1,
			(i: number) => (test2 = i)
		)

		expect(test).to.equal(1)
		expect(test2).to.equal(0)
	})

	it('forwardTernAsync', async function () {
		let test = 0
		let test2 = 0

		await forward.forwardTernAsync(
			1,
			async (i: number) => i === 1,
			(i: number) => (test = i),
			() => 0
		)
		await forward.forwardTernAsync(
			2,
			async (i: number) => i === 1,
			() => 0,
			(i: number) => (test2 = i)
		)

		expect(test).to.equal(1)
		expect(test2).to.equal(2)
	})
})
