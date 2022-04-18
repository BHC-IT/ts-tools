import { expect } from 'chai';

import { Maybe } from '../src/effects/Maybe';
import { Throwable } from '../src/effects/Throwable';
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

	it('fmap of Maybe array no full valide', function() {
		let i : Maybe<number>[] = [Maybe.just(0), Maybe.nothing, Maybe.just(2), Maybe.nothing, Maybe.nothing, Maybe.just(4)];

		const res : Maybe<number>[] = fmap((e:number) => e + 1, i);

		Maybe.fmap((e : number) => expect(e).to.equal(1), res[0]);
		Maybe.fmap((e : number) => expect(e).to.equal(3), res[2]);
		Maybe.fmap((e : number) => expect(e).to.equal(5), res[5]);
	});

	it('fmap of Throwable', function() {
		let i : Throwable<number> = Throwable.resolved(0);

		const res : Throwable<number> = fmap((e:number) => e + 1, i);

		Throwable.fmap((e : number) => expect(e).to.equal(1), res);
	});

	it('fmap of Throwable array', function() {
		let i : Throwable<number>[] = [Throwable.resolved(0), Throwable.resolved(1), Throwable.resolved(2)];

		const res : Throwable<number>[] = fmap((e:number) => e + 1, i);

		Throwable.fmap((e : number) => expect(e).to.equal(1), res[0]);
		Throwable.fmap((e : number) => expect(e).to.equal(2), res[1]);
		Throwable.fmap((e : number) => expect(e).to.equal(3), res[2]);
	});

	it('fmap of Throwable array no full valide', function() {
		let i : Throwable<number>[] = [Throwable.resolved(0), Throwable.thrown('test'), Throwable.resolved(2), Throwable.thrown('test'), Throwable.thrown('test'), Throwable.resolved(5)];

		const res : Throwable<number>[] = fmap((e:number) => e + 1, i);

		Throwable.fmap((e : number) => expect(e).to.equal(1), res[0]);
		Throwable.fmap((e : number) => expect(e).to.equal(3), res[2]);
		Throwable.fmap((e : number) => expect(e).to.equal(6), res[5]);
	});

	it('fmap of nested Maybe', function() {
		const monad = Maybe.just(Maybe.just(Maybe.just(5)))
		const res = fmap((a: number) => a + 5, monad)
		expect(res.fromJust()).to.eql(10);
	});
});

