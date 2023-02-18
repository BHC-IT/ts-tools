import { expect, describe, it } from 'vitest'

import { maybe, Maybe, M } from '../../src'

import { emit } from '../../src/tools/emit'

describe('test Maybe', function () {
	it('isJust of Just', function () {
		const i = maybe.just(0)

		expect(i.isJust()).to.equal(true)
	})

	it('isJust of Nothing', function () {
		let i: Maybe<number> = maybe.nothing

		expect(maybe.isJust(i)).to.equal(false)
	})

	it('isNothing of Just', function () {
		const i = maybe.just(0)

		expect(i.isNothing()).to.equal(false)
	})

	it('isNothing of Nothing', function () {
		let i: Maybe<number> = maybe.nothing

		expect(maybe.isNothing(i)).to.equal(true)
	})

	it('Maybe fmap when Just', function () {
		const i = maybe.just(0)

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromJust()).to.equal(1)
	})
	it('Maybe fmap when Nothing', function () {
		const i: Maybe<number> = maybe.nothing

		const res = i.fmap((e: number) => e + 1)
		expect(res).to.equal(maybe.nothing)
	})

	it('Maybe apply when Just', function () {
		const i: Maybe<number> = maybe.just(0)

		const res = i.apply(maybe.just((e: number) => e + 1))
		expect(res.fromJust()).to.equal(1)
	})
	it('Maybe apply when Nothing', function () {
		const i: Maybe<number> = maybe.nothing

		const res = i.apply(maybe.just((e: number) => e + 1))
		expect(res).to.equal(maybe.nothing)
	})
	it('Maybe apply when Just but func Nothing', function () {
		const i: Maybe<number> = maybe.just(0)

		const res = i.apply(maybe.nothing)
		expect(res).to.equal(maybe.nothing)
	})
	it('Maybe apply when all Nothing', function () {
		const i: Maybe<number> = maybe.nothing

		const res = i.apply(maybe.nothing)
		expect(res).to.equal(maybe.nothing)
	})

	it('Maybe bind when Just', function () {
		const i: Maybe<number> = maybe.just(0)

		const res = i.bind((e: number) => maybe.just(e + 1))
		expect(res.fromJust()).to.equal(1)
	})
	it('Maybe bind when Nothing', function () {
		const i: Maybe<number> = maybe.nothing

		const res = i.bind((e: number) => maybe.just(e + 1))
		expect(res).to.equal(maybe.nothing)
	})

	it('Maybe fromJust of just', function () {
		const i = maybe.just(0)

		expect(maybe.fromJust(i)).to.equal(0)
	})

	it('Maybe fromJust of nothing', function () {
		const i = maybe.nothing

		expect(() => maybe.fromJust(i)).to.throws()
	})

	it('Maybe fromMaybe of just', function () {
		const i = maybe.just(0)

		expect(i.fromMaybe(1)).to.equal(0)
	})

	it('Maybe fromMaybe of nothing', function () {
		const i = maybe.nothing

		expect(maybe.fromMaybe(1, i)).to.equal(1)
	})

	it('Maybe listToMaybe', function () {
		const i = maybe.fromList([0, 1])

		expect(maybe.fromMaybe(1, i)).to.equal(0)
	})

	it('Maybe listToMaybe empty list', function () {
		const i = maybe.fromList<number>([])

		expect(maybe.fromMaybe(1, i)).to.equal(1)
	})

	it('Maybe toList just', function () {
		const i = maybe.just(1)

		expect(i.toList()).to.eql([1])
	})
	it('Maybe toList nothing', function () {
		const i = maybe.nothing

		expect(maybe.toList(i)).to.eql([])
	})

	it('Maybe fcase just', function () {
		const i = maybe.just(1)

		expect(
			maybe.fcase(
				i,
				i => i,
				() => 0
			)
		).to.eql(1)
	})
	it('Maybe fcase nothing', function () {
		const i = maybe.nothing

		expect(
			maybe.fcase(
				i,
				i => i,
				() => 0
			)
		).to.eql(0)
	})

	it('Maybe cat', function () {
		const i = [maybe.just(1), maybe.nothing, maybe.just(2)]

		expect(maybe.cat(i)).to.eql([1, 2])
	})

	it('Maybe map', function () {
		const f = (a: number) => (a % 2 === 0 ? maybe.just(a) : maybe.nothing)

		const bs = maybe.map(f, [0, 1, 2, 3, 4, 5])

		expect(bs).to.eql([0, 2, 4])
	})

	it('Maybe<number> flatten from Monad', function () {
		const deepMaybe = maybe.just(maybe.just(5))

		const flatMaybe = M.flatten(deepMaybe)

		expect(flatMaybe.fromMaybe(0)).to.eql(5)
	})

	it('Maybe<number> flatten from Maybe', function () {
		const deepMaybe = maybe.just(maybe.just(5))

		const flatMaybe = deepMaybe.flatten()

		expect(flatMaybe.fromMaybe(0)).to.eql(5)
	})

	it('maybe.nothing flatten', function () {
		const deepMaybe = maybe.nothing

		const flatMaybe = M.flatten(deepMaybe)

		expect(flatMaybe.fromMaybe(0)).to.eql(0)
	})

	it('Maybe liftFromThrowable', function () {
		const f = (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = maybe.liftFromThrowable(f)

		const a = fm(0)
		const b = fm(1)

		expect(maybe.fromJust(a)).to.eql(0)

		expect(maybe.isNothing(b)).to.equal(true)
	})

	it('Maybe liftFromThrowableAsync', async function () {
		const f = async (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = maybe.liftFromThrowableAsync(f)

		const a = fm(0)
		const b = fm(1)

		expect(maybe.fromJust(await a)).to.eql(0)

		expect(maybe.isNothing(await b)).to.equal(true)
	})

	it('Maybe case 1', async function () {
		let i = 0
		const f = (a: number) => (i = a)
		const n = () => (i = -1)

		const m = maybe.just(1)

		m.case(f, n)

		expect(i).to.equal(1)
	})

	it('Maybe case 2', async function () {
		let i = 0
		const f = (a: number) => (i = a)
		const n = () => (i = -1)

		const m = maybe.nothing

		m.case(f, n)

		expect(i).to.equal(-1)
	})
})
