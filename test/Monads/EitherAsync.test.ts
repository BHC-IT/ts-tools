import { expect, describe, it } from 'vitest'

import { either, eitherAsync, task } from '../../src'

describe('test EitherAsync', function () {
	it('right', async function () {
		const t = eitherAsync.right(0)

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('left', async function () {
		const t = eitherAsync.left(0)

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromTask', async function () {
		const t = eitherAsync.fromTask(task.fromPromise(Promise.resolve(0)))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromTask rejected', async function () {
		const t = eitherAsync.fromTask(task.fromPromise(Promise.reject(0)))

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromEither', async function () {
		const t = eitherAsync.fromEither(either.right(0))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromTaskEither', async function () {
		const t = eitherAsync.fromTaskEither(task.resolve(either.right(0)))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromFunction', async function () {
		const t = eitherAsync.fromFunction(() => Promise.resolve(0))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromFunction rejected', async function () {
		const t = eitherAsync.fromFunction(() => Promise.reject(0))

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromFunction throw', async function () {
		const t = eitherAsync.fromFunction(() => {
			throw 0
		})

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fromFunction async throw', async function () {
		const t = eitherAsync.fromFunction(async () => {
			throw 0
		})

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('fmap', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.resolve(0))
			.fmap(a => a + 1)

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(1)
	})

	it('fmap rejected', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.reject(0))
			.fmap(a => a + 1)

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('apply', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.resolve(0))
			.apply(eitherAsync.right(a => a + 1))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(1)
	})

	it('apply rejected', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.reject(0))
			.apply(eitherAsync.right(a => a + 1))

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('apply rejecting', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.resolve(0))
			.apply(eitherAsync.left((a: unknown) => a.toString()))

		expect((await t._record).isLeft()).toBe(true)
	})

	it('bind', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.resolve(0))
			.bind(a => eitherAsync.right(a + 1))

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(1)
	})

	it('bind rejected', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.reject(0))
			.bind(a => eitherAsync.right(a + 1))

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('bind rejecting', async function () {
		const t = eitherAsync
			.fromFunction(() => Promise.resolve(0))
			.bind(a => eitherAsync.left('a'))

		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe('a')
	})

	it('flatten', async function () {
		// @ts-expect-error
		const t = eitherAsync.right(eitherAsync.right(0)).flatten()

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('flatten rejected', async function () {
		// @ts-expect-error
		const t = eitherAsync.left(eitherAsync.right(0)).flatten()

		expect((await t._record).isRight()).toBe(true)
		expect((await t._record).isLeft()).toBe(false)
		expect((await t._record)._record).toBe(0)
	})

	it('flatten rejected 2', async function () {
		// @ts-expect-error
		const t = eitherAsync.right(eitherAsync.left(0)).flatten()

		expect((await t._record).isRight()).toBe(false)
		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('flatten rejected 3', async function () {
		// @ts-expect-error
		const t = eitherAsync.right(eitherAsync.left(0)).flatten()

		expect((await t._record).isRight()).toBe(false)
		expect((await t._record).isLeft()).toBe(true)
		expect((await t._record)._record).toBe(0)
	})

	it('toPromise', async function () {
		const t = eitherAsync.right(0)

		// @ts-expect-error
		expect(await t.toPromise().then(a => a._record + 1)).toBe(1)
	})

	it('toTask', async function () {
		const t = eitherAsync.right(0)

		// @ts-expect-error
		expect(await t.toTask().then(a => a._record + 1)).toBe(1)
	})

	it('toTask rejected', async function () {
		const t = eitherAsync.left(0)

		expect(await t.toTask().then(a => (a._record as number) + 1)).toBe(1)
	})
})
