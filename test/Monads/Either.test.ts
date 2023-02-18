import { expect, describe, it } from 'vitest'

import { either, Either, M } from '../../src'

describe('test Either', function () {
	it('isResolved of right', function () {
		const i: Either<unknown, number> = either.right(0)

		expect(i.isRight()).to.equal(true)
	})
	it('isResolved of left', function () {
		let i: Either<Error, unknown> = either.left(new Error('test'))

		expect(i.isRight()).to.equal(false)
	})

	it('isNothing of right', function () {
		const i: Either<unknown, number> = either.right(0)

		expect(i.isLeft()).to.equal(false)
	})

	it('isNothing of left', function () {
		let i: Either<Error, unknown> = either.left(new Error('test'))

		expect(i.isLeft()).to.equal(true)
	})

	it('Either fmap right when right', function () {
		const i: Either<unknown, number> = either.right(0)

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either fmap right when left', function () {
		const i: Either<Error, number> = either.left(new Error('test'))

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromLeft(new Error('0')).message).to.eql('test')
	})

	it('Either apply right when right', function () {
		const i: Either<unknown, number> = either.right(0)

		const res = i.apply(either.right((e: number) => e + 1))
		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either apply right when left', function () {
		const i: Either<string, number> = either.left('0')

		const res = i.apply(either.right((e: number) => e + 1))
		expect(res.fromRight(0)).to.equal(0)
	})

	it('Either apply left when right', function () {
		const i: Either<string, number> = either.right(1)

		const res = i.apply(either.left(null))
		expect(res.fromRight(0)).to.equal(0)
	})

	it('Either apply left when left', function () {
		const i: Either<string, number> = either.left('0')

		const res = i.apply(either.left(null))
		expect(res.fromRight(0)).to.equal(0)
	})

	it('Either bind right when right', function () {
		const i: Either<unknown, number> = either.right(0)

		const res = i.bind((e: number) => either.right(e + 1))
		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either bind right when left', function () {
		const i: Either<Error, number> = either.left(new Error('test'))

		const res = i.bind((e: number) => either.right(e + 1))
		expect(res.fromLeft(new Error('0')).message).to.eql('test')
	})

	it('Either flatten', function () {
		const i: Either<
			Either<string, number>,
			Either<string, number>
		> = either.right(either.right(0))

		const res = i.flatten()
		expect(res.fromRight(1)).to.eql(0)
	})

	it('Either flatten left', function () {
		const i: Either<
			Either<string, number>,
			Either<string, number>
		> = either.left(either.right(0))

		const res = i.flatten()
		expect(res.fromRight(1)).to.eql(1)
	})

	it('Either flatten left 2', function () {
		const i: Either<
			Either<string, number>,
			Either<string, number>
		> = either.right(either.left('0'))

		const res = i.flatten()
		expect(res.fromRight(1)).to.eql(1)
	})

	it('Either flatten monad', function () {
		const i: Either<
			Either<string, number>,
			Either<string, number>
		> = either.right(either.right(0))

		const res = M.flatten(i)
		expect(res.fromRight(1)).to.eql(0)
	})

	it('Either fromRight of right', function () {
		const i = either.right(0)

		expect(i.fromRight(0)).to.equal(0)
	})

	it('Either fromRight of left', function () {
		const i = either.left('test')

		expect(i.fromRight(0)).to.eql(0)
	})

	it('Either fromLeft of right', function () {
		const i = either.right(0)

		expect(i.fromLeft('0')).to.eql('0')
	})

	it('Either fromLeft of left', function () {
		const i = either.left('test')

		expect(i.fromLeft('0')).to.equal('test')
	})

	it('Either lift', function () {
		const i: Either<unknown, number> = either.right(0)
		const inc = (e: number) => e + 1
		const minc = either.lift(inc)

		const res = minc(i)

		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either either of right', function () {
		const i = either.right<number, number>(0)

		expect(
			i.fromEither(
				a => a - 1,
				a => a + 1
			)
		).to.equal(1)
	})

	it('Either either of left', function () {
		const i = either.left<number, number>(0)

		expect(
			i.fromEither(
				a => a - 1,
				a => a + 1
			)
		).to.equal(-1)
	})
})
