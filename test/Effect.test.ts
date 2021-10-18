import { expect } from 'chai'

import { Effect } from '../src/effects/Effect'

class Ext<A> extends Effect<any> {
	public fmap = <B extends any>(f:(a: A) => B): Ext<B> => null;
	public bind = <B extends any>(f:(a: A) => Ext<B>): Ext<B> => null;
	public isValide = (): boolean => true;
	public _open = (): boolean => true;
}

describe('test Maybe', function() {

	it('Effect identity, test from Maybe', function() {
		const e = new Ext<number>()

		expect(e.identity()).to.eql(Effect)
	})

})
