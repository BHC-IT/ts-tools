import { expect, describe, it } from 'vitest'

import { Effect } from '../src/effects/Effect'

class Ext<A> extends Effect<A> {
	record: A
	constructor(a: A) {
		super()
		this.record = a
	}
	static pure = <A>(a: A): Ext<A> => new Ext(a)
	public fmap = <B extends any>(f: (a: A) => B): Ext<B> => null
	public bind = <B extends any>(f: (a: A) => Ext<B>): Ext<B> => null
	public isValide = (): boolean => true
	public _open = (): unknown => this.record
}

describe('test Effect', function () {
	it('Effect identity, test from Ext', function () {
		const e = new Ext<number>(5)

		expect(e.identity()).to.eql(Effect)
	})

	it('Effect flatten, test from Ext', function () {
		const e = Ext.pure(Ext.pure(Ext.pure(Ext.pure(5))))

		const res = e.flatten()

		expect(res._open()).to.eql(5)
	})
})
