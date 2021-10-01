import { expect } from 'chai';

import { Pipe } from '../src/index';


describe('test Pipe', function() {

	it('skipIf true', function() {
		const test = Pipe.skipIf((a: number) => a * 2, (a: number) => a > 0)


		expect(test(5)).to.equal(10);
	});

	it('skipIf false', function() {
		const test = Pipe.skipIf((a: number) => a * 2, (a: number) => a > 0)


		expect(test(-5)).to.equal(-5);
	});

	it('discard', function() {
		const test = Pipe.discard((a: number) => a * 2)


		expect(test(10)).to.equal(10);
	});

});

