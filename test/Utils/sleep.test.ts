import { expect, describe, it } from 'vitest'
import { sleep } from '../../src/Utils/sleep'

describe('test sleep', function () {
	it('sleep simple case', async () => {
		const time = Date.now()

		await sleep(100)

		const ellapsed = Date.now() - time
		expect(ellapsed >= 100 && ellapsed < 110).to.equal(true)
	})

	it('sleep double case', async () => {
		const time = Date.now()

		await sleep(100)
		await sleep(100)

		const ellapsed = Date.now() - time
		expect(ellapsed >= 200 && ellapsed < 220).to.equal(true)
	})
})
