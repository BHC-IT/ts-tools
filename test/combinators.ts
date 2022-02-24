import { expect } from 'chai';

import { Combinators } from '../src/index';

/*
export const values = <A>(arr: Array<A>) => arr.values()
*/

describe('test Combinators', function() {

	it('identity', function() {
		expect(Combinators.identity(0)).to.eql(0);
	});

	it('constant', function() {
		expect(Combinators.constant(0, 1)).to.eql(0);
	});

	it('apply', function() {
		expect(Combinators.apply(a => a + 1, 0)).to.eql(1);
	});

	it('thrust', function() {
		expect(Combinators.thrust(0, a => a + 1)).to.eql(1);
	});

	it('duplication', function() {
		expect(Combinators.duplication((a, b) => a + b, 1)).to.eql(2);
	});

	it('flip', function() {
		expect(Combinators.flip((a, b) => Number(a) + b, 1, '0')).to.eql(1);
	});

	it('compose2', function() {
		expect(Combinators.compose2((a: number) => a.toString(), a => a + 1, 0)).to.eql('1');
	});

	it('substitution', function() {
		expect(Combinators.substitution(
			(a, b: number) => Number(a) + b,
			(a) => Number(a),
			'1'
		)).to.eql(2);
	});

	it('chain', function() {
		expect(Combinators.chain(
			(a: number, b) => a + Number(b),
			(a) => Number(a),
			'1'
		)).to.eql(2);
	});

	it('converge', function() {
		expect(Combinators.converge(
			(a: {test: number}, b: {foo: number}) => a.test + b.foo,
			(a) => ({test: Number(a)}),
			(a) => ({foo: Number(a)}),
			'1'
		)).to.eql(2);
	});

	it('psi', function() {
		expect(Combinators.psi(
			(a: number, b: number) => a + b,
			(a) => Number(a),
			'0',
			'1'
		)).to.eql(1);
	});

	it('fix', function() {
		expect(Combinators.fix(
			(a) => a + 1,
			0
		)).to.eql(1);
	});

});

