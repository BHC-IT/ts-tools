import { expect } from 'chai';

import { Maybe } from '../src/effects/Maybe';
// import { Just, Nothing } from '../src/types/Maybe';


describe('test Maybe', function() {

	it('isJust of Just', function() {
		const i : Maybe<number> = Maybe.just(0);

		expect(Maybe.isJust(i)).to.equal(true);
	});
	it('isJust of Nothing', function() {
		let i : Maybe<number> = Maybe.nothing;

		expect(Maybe.isJust(i)).to.equal(false);
	});

	it('isNothing of Just', function() {
		const i : Maybe<number> = Maybe.just(0);

		expect(Maybe.isNothing(i)).to.equal(false);
	});

	it('isNothing of Nothing', function() {
		let i : Maybe<number> = Maybe.nothing;

		expect(Maybe.isNothing(i)).to.equal(true);
	});

	it ('Maybe for Just when Just', function() {
		const i : Maybe<number> = Maybe.just(0);

		const res = Maybe.fmap((e : number) => e + 1, i);
		Maybe.fmap((e : number) => expect(e).to.equal(1), res);
	});
	it ('Maybe for Just when Nothing', function() {
		const i : Maybe<number> = Maybe.nothing;

		const res = Maybe.fmap((e : number) => e + 1, i);
		expect(res).to.equal(Maybe.nothing);
	});

	it ('Maybe lift', function() {
		const i : Maybe<number> = Maybe.from(0);
		const inc = (e : number) => e + 1;
		const minc = Maybe.lift(inc);

		const res = minc(i);

		Maybe.fmap((e : number) => expect(e).to.equal(1), res);
	});

	it ('Maybe from nothing', function() {
		const i = Maybe.from(Maybe.nothing);

		expect(i).to.equal(Maybe.nothing);
	});

	it ('Maybe identity', function() {
		const i = Maybe.from(Maybe.nothing);

		expect(i.identity()).to.equal(Maybe);
	});

});

