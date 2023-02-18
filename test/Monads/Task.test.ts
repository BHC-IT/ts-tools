import { expect, describe, it } from 'vitest'

import { task, M } from '../../src'

describe('test Task', function () {
	it('fromPromise', async function () {
		const t = task.fromPromise(Promise.resolve(0))

		expect(await t).toBe(0)
	})

	it('resolve', async function () {
		const t = task.resolve(0)

		expect(await t).toBe(0)
	})

	it('reject', function () {
		expect(
			async () => await task.reject(new Error())
		).rejects.toThrowError()
	})

	it('fromFunction', async function () {
		const t = task.fromFunction(() => Promise.resolve(0))

		expect(await t).toBe(0)
	})

	it('fromFunction rejecting', async function () {
		expect(
			task.fromFunction(() => {
				throw new Error()
			})
		).rejects.toThrowError()
	})

	it('fmap', async function () {
		const t = task.fromFunction(() => Promise.resolve(0))

		expect(await t.fmap(a => a + 1)).toBe(1)
	})

	it('apply', async function () {
		const t = task.fromFunction(() => Promise.resolve(0))

		expect(await t.apply(task.resolve(a => a + 1))).toBe(1)
	})

	it('bind', async function () {
		const t = task.fromFunction(() => Promise.resolve(0))

		expect(await t.bind(a => task.resolve(a + 1))).toBe(1)
	})

	it('flatten', async function () {
		const t = task.resolve(task.resolve(0))

		expect(await M.flatten(t)).toBe(0)
	})

	it('flatten', async function () {
		const t = task.resolve(task.resolve(0))

		expect(await t.flatten()).toBe(0)
	})

	it('toPromise', async function () {
		const t = task.resolve(0)

		expect(await t.toPromise().then(a => a + 1)).toBe(1)
	})

	it('all', async function () {
		const t = task.all(
			Promise.resolve(1),
			Promise.resolve('a'),
			task.resolve([0])
		)

		expect(await t).toStrictEqual([1, 'a', [0]])
	})

	it('allSettled', async function () {
		const t = task.allSettled(Promise.resolve(1), Promise.reject('a'))

		expect(await t).toStrictEqual([
			{ status: 'fulfilled', value: 1 },
			{ status: 'rejected', reason: 'a' },
		])
	})

	it('any', async function () {
		const t = task.any(Promise.resolve(1), Promise.reject('a'))

		expect(await t).toStrictEqual(1)
	})

	it('race', async function () {
		const t = task.race(Promise.resolve(1), Promise.reject('a'))

		expect(await t).toStrictEqual(1)
	})
})
