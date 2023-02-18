import { expect, describe, it } from 'vitest'

import { pipe, pipeAsync } from '../src/index'

const result = pipe(
	(x: number) => x + 1,
	(x: number) => x * 2,
	(x: number) => x - 1
)
const test = pipe(
	(x: number, y: string) => x + Number.parseInt(y) + 1,
	(x: number) => x * 2,
	(x: number) => x - 1
)
const resultAsync = pipeAsync(
	async (x: number) => x + 1,
	async (x: number) => x * 2,
	(x: number) => x - 1
)

describe('test pipe', function () {
	it('pipe(...) should return 1', function () {
		expect(result(0)).to.equal(1)
	})
	it('pipe(...) should return 3', function () {
		expect(result(1)).to.equal(3)
	})
	it('pipe(...) should return 5', function () {
		expect(result(2)).to.equal(5)
	})
	it('pipe(...) should return 5, typecheck', function () {
		const i: number = test(2, '0')

		expect(i).to.equal(5)
	})

	it('pipeAsync(...) should return 5', async function () {
		const i: number = await resultAsync(2)

		expect(i).to.equal(5)
	})
})
