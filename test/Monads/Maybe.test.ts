import { expect, describe, it } from 'vitest'

import { Maybe, Monad } from '../../src/Monads'

import { emit } from '../../src/tools/emit'

describe('test Maybe', function () {
	it('isJust of Just', function () {
		const i = Maybe.just(0)

		expect(i.isJust()).to.equal(true)
	})

	it('isJust of Nothing', function () {
		let i: Maybe.Maybe<number> = Maybe.nothing

		expect(Maybe.isJust(i)).to.equal(false)
	})

	it('isNothing of Just', function () {
		const i = Maybe.just(0)

		expect(i.isNothing()).to.equal(false)
	})

	it('isNothing of Nothing', function () {
		let i: Maybe.Maybe<number> = Maybe.nothing

		expect(Maybe.isNothing(i)).to.equal(true)
	})

	it('Maybe for Just when Just', function () {
		const i = Maybe.just(0)

		const res = i.fmap((e: number) => e + 1)
		expect(res.fromJust()).to.equal(1)
	})
	it('Maybe for Just when Nothing', function () {
		const i: Maybe.Maybe<number> = Maybe.nothing

		const res = i.fmap((e: number) => e + 1)
		expect(res).to.equal(Maybe.nothing)
	})

	it('Maybe for Just when Just', function () {
		const i: Maybe.Maybe<number> = Maybe.just(0)

		const res = i.bind((e: number) => Maybe.just(e + 1))
		expect(res.fromJust()).to.equal(1)
	})
	it('Maybe for Just when Nothing', function () {
		const i: Maybe.Maybe<number> = Maybe.nothing

		const res = i.bind((e: number) => Maybe.just(e + 1))
		expect(res).to.equal(Maybe.nothing)
	})

	it('Maybe fromJust of just', function () {
		const i = Maybe.just(0)

		expect(Maybe.fromJust(i)).to.equal(0)
	})

	it('Maybe fromJust of nothing', function () {
		const i = Maybe.nothing

		expect(() => Maybe.fromJust(i)).to.throws()
	})

	it('Maybe fromMaybe of just', function () {
		const i = Maybe.just(0)

		expect(i.fromMaybe(1)).to.equal(0)
	})

	it('Maybe fromMaybe of nothing', function () {
		const i = Maybe.nothing

		expect(Maybe.fromMaybe(1, i)).to.equal(1)
	})

	it('Maybe listToMaybe', function () {
		const i = Maybe.fromList([0, 1])

		expect(Maybe.fromMaybe(1, i)).to.equal(0)
	})

	it('Maybe listToMaybe empty list', function () {
		const i = Maybe.fromList<number>([])

		expect(Maybe.fromMaybe(1, i)).to.equal(1)
	})

	it('Maybe toList just', function () {
		const i = Maybe.just(1)

		expect(i.toList()).to.eql([1])
	})

	it('Maybe toList nothing', function () {
		const i = Maybe.nothing

		expect(Maybe.toList(i)).to.eql([])
	})

	it('Maybe cat', function () {
		const i = [Maybe.just(1), Maybe.nothing, Maybe.just(2)]

		expect(Maybe.cat(i)).to.eql([1, 2])
	})

	it('Maybe map', function () {
		const f = (a: number) => (a % 2 === 0 ? Maybe.just(a) : Maybe.nothing)

		const bs = Maybe.map(f, [0, 1, 2, 3, 4, 5])

		expect(bs).to.eql([0, 2, 4])
	})

	it('Maybe<number> flatten', function () {
		const deepMaybe = Maybe.just(Maybe.just(5))

		const flatMaybe = Monad.flatten(deepMaybe)

		expect(flatMaybe.fromMaybe(0)).to.eql(5)
	})

	it('Maybe.nothing flatten', function () {
		const deepMaybe = Maybe.just(Maybe.just(1))

		const flatMaybe = Monad.flatten(deepMaybe)

		expect(flatMaybe.fromMaybe(0)).to.eql(1)
	})

	it('Maybe liftFromThrowable', function () {
		const f = (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = Maybe.liftFromThrowable(f)

		const a = fm(0)
		const b = fm(1)

		expect(Maybe.fromJust(a)).to.eql(0)

		expect(Maybe.isNothing(b)).to.equal(true)
	})

	it('Maybe liftFromThrowableAsync', async function () {
		const f = async (a: number) => (a % 2 === 0 ? a : emit(''))

		const fm = Maybe.liftFromThrowableAsync(f)

		const a = fm(0)
		const b = fm(1)

		expect(Maybe.fromJust(await a)).to.eql(0)

		expect(Maybe.isNothing(await b)).to.equal(true)
	})

	it('Maybe case 1', async function () {
		let i = 0
		const f = (a: number) => (i = a)
		const n = () => (i = -1)

		const m = Maybe.just(1)

		m.case(f, n)

		expect(i).to.equal(1)
	})

	it('Maybe case 2', async function () {
		let i = 0
		const f = (a: number) => (i = a)
		const n = () => (i = -1)

		const m = Maybe.nothing

		m.case(f, n)

		expect(i).to.equal(-1)
	})
})
