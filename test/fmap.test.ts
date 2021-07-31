import { expect } from 'chai';

import { Maybe } from '../src/effects/Maybe';
// import { Effect } from '../src/effects/Effect';
import { fmap } from '../src/tools/fmap';


describe('test fmap', function() {

	it('fmap of Maybe', function() {
		let i : Maybe<number> = Maybe.just(0);

		const res : Maybe<number> = fmap((e:number) => e + 1, i);

		Maybe.fmap((e : number) => expect(e).to.equal(1), res);
	});

	it('fmap of Maybe array', function() {
		let i : Maybe<number>[] = [Maybe.just(0), Maybe.just(1), Maybe.just(2)];

		const res : Maybe<number>[] = fmap((e:number) => e + 1, i);

		Maybe.fmap((e : number) => expect(e).to.equal(1), res[0]);
		Maybe.fmap((e : number) => expect(e).to.equal(2), res[1]);
		Maybe.fmap((e : number) => expect(e).to.equal(3), res[2]);
	});
});

