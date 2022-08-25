import { expect, describe, it } from 'vitest'

import { Either } from '../src/effects/Either'
import { Effect } from '../src/effects/Effect'

import { emit } from '../src/tools/emit'

describe('test Either', function () {
	it('check instance', function () {
		const i: Either<unknown, number> = Either.right(0)

		expect(i instanceof Effect).to.equal(true)
		expect(i instanceof Either).to.equal(true)
	})

	it('isResolved of right', function () {
		const i: Either<unknown, number> = Either.right(0)

		expect(i.isRight()).to.equal(true)
	})
	it('isResolved of left', function () {
		let i: Either<Error, unknown> = Either.left(new Error('test'))

		expect(Either.isRight(i)).to.equal(false)
	})

	it('isNothing of right', function () {
		const i: Either<unknown, number> = Either.right(0)

		expect(i.isLeft()).to.equal(false)
	})

	it('isNothing of left', function () {
		let i: Either<Error, unknown> = Either.left(new Error('test'))

		expect(Either.isLeft(i)).to.equal(true)
	})

	it('Either for right when right', function () {
		const i: Either<unknown, number> = Either.right(0)

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either for right when left', function () {
		const i: Either<Error, number> = Either.left(new Error('test'))

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromLeft(new Error('0')).message).to.eql('test')
	})

	it('Either for right when right', function () {
		const i: Either<unknown, number> = Either.right(0)

		const res = i.bind((e: number) => Either.right(e + 1))
		expect(res.fromRight(0)).to.equal(1)
	})

	it('Either for right when left', function () {
		const i: Either<Error, number> = Either.left(new Error('test'))

		const res = i.bind((e: number) => Either.right(e + 1))
		expect(res.fromLeft(new Error('0')).message).to.eql('test')
	})

	it('Either lift', function () {
		const i: Either<unknown, number> = Either.right(0)
		const inc = (e: number) => e + 1
		const minc = Either.lift(inc)

		const res = minc(i)

		Either.fmap((e: number) => expect(e).to.equal(1), res)
	})

	it('Either identity', function () {
		const i = Either.right(0)

		expect(i.identity()).to.equal(Either)
	})

	it('Either isValide', function () {
		const i = Either.right(0)

		expect(i.isValide()).to.equal(true)
	})

	it('Either fromRight of right', function () {
		const i = Either.right(0)

		expect(Either.fromRight(0, i)).to.equal(0)
	})

	it('Either fromRight of left', function () {
		const i = Either.left('test')

		expect(Either.fromRight(0, i)).to.eql(0)
	})

	it('Either fromLeft of right', function () {
		const i = Either.right(0)

		expect(Either.fromLeft('0', i)).to.eql('0')
	})

	it('Either fromLeft of left', function () {
		const i = Either.left('test')

		expect(Either.fromLeft('0', i)).to.equal('test')
	})

	it('Either either of right', function () {
		const i = Either.right<number, number>(0)

		expect(
			i.either(
				a => a - 1,
				a => a + 1
			)
		).to.equal(1)
	})

	it('Either either of left', function () {
		const i = Either.left<number, number>(0)

		expect(
			i.either(
				a => a - 1,
				a => a + 1
			)
		).to.equal(-1)
	})

	it('Either liftFromThrowable', function () {
		const f = (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = Either.liftFromThrowable(f)

		const a = fm(0)
		const b = fm(1)

		expect(Either.fromRight(1, a)).to.eql(0)

		expect(Either.isLeft(b)).to.equal(true)
	})

	it('Either liftFromThrowableAsync', async function () {
		const f = async (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = Either.liftFromThrowableAsync(f)

		const a = fm(0)
		const b = fm(1)

		expect(Either.fromRight(1, await a)).to.eql(0)

		expect(Either.isLeft(await b)).to.equal(true)
	})

	it('Either case 1', async function () {
		let i: string = '0'
		const f = (a: string) => (i = a + '1')
		const g = (a: number) => (i = `${a}0`)

		const m = Either.right<string, number>(1)

		m.case(f, g)

		expect(i).to.equal('10')
	})

	it('Either case 2', async function () {
		let i: number | string = 0
		const f = (a: string) => (i = a + '1')
		const g = (a: number) => (i = `${a}0`)

		const m = Either.left<string, number>('1')

		m.case(f, g)

		expect(i).to.equal('11')
	})

	it('Either open', function () {
		const m = Either.right<string, number>(1)

		expect(m.open()).to.equal(1)
	})

	it('Either _open', function () {
		const m = Either.right(0)

		expect(m._open()).to.eql(0)
	})
})
