import { expect } from 'chai';

import type { Maybe } from '../src/types/Maybe';
// import { Just, Nothing } from '../src/types/Maybe';

import { just, nothing, isJust, isNothing, callMaybe } from '../src/tools/maybe';


describe('test Maybe', function() {

	it('isJust of Just', function() {
		const i : Maybe<number> = just(0);

		expect(isJust(i)).to.equal(true);
	});
	it('isJust of Nothing', function() {
		let i : Maybe<number> = nothing;

		expect(isJust(i)).to.equal(false);
	});

	it('isNothing of Just', function() {
		const i : Maybe<number> = just(0);

		expect(isNothing(i)).to.equal(false);
	});

	it('isNothing of Nothing', function() {
		let i : Maybe<number> = nothing;

		expect(isNothing(i)).to.equal(true);
	});

	it ('callMaybe for Just when Just', function() {
		const i : Maybe<number> = just(0);

		const res = callMaybe((e : number) => e + 1).when.isJust(i);
		expect(res).to.equal(1);
	});
	it ('callMaybe for Just when Nothing', function() {
		const i : Maybe<number> = nothing;

		const res = callMaybe((e : number) => e + 1).when.isJust(i);
		expect(res).to.equal(nothing);
	});

	it ('callMaybe for Nothing when Just', function() {
		const i : Maybe<number> = just(0);

		let proof : number = 0;

		callMaybe(() => proof = 1).when.isNothing(i);
		expect(proof).to.equal(0);
	});
	it ('callMaybe for Nothing when Nothing', function() {
		const i : Maybe<number> = nothing;

		let proof : number = 0;

		callMaybe(() => proof = 1).when.isNothing(i);
		expect(proof).to.equal(1);
	});

});

