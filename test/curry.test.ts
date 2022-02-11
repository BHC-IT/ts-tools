import { expect } from 'chai';
import { curry, rcurry } from '../src/tools/curry';

const add = (x1 : number, x2 : number) => x1 + x2;

const many_add = (x1 : number, x2 : number, x3 : number, x4 : number) => x1 + x2 + x3 + x4;

const addc = curry(add, 1);

const addcm = curry(many_add, 1, 2);

const minus = (a: number, b: number) => a - b

const minusc = curry(minus, 1);
const minuscr = rcurry(minus, 1);

describe('test curry', function() {
	it('curry(...) should return 1', function() {
		expect(addc(0)).to.equal(1);
	});
	it('curry(...) should return 2', function() {
		expect(addc(1)).to.equal(2);
	});
	it('curry(...) should return 3', function() {
		expect(addc(2)).to.equal(3);
	});

	it('curry(...) should return 3', function() {
		expect(addcm(0, 0)).to.equal(3);
	});
	it('curry(...) should return 6', function() {
		expect(addcm(1, 2)).to.equal(6);
	});
	it('curry(...) should return 8', function() {
		expect(addcm(2, 3)).to.equal(8);
	});

	it('curry(...) should return NaN', function() {
		//@ts-ignore
		expect(addcm(2)).to.eql(NaN);
	});

	it('rcurry(...) should return 1', function() {
		expect(minuscr(2)).to.equal(1);
	});

	it('rcurry(...) should return -1', function() {
		expect(minuscr(0)).to.equal(-1);
	});

	it('curry(...) should return -1', function() {
		expect(minusc(2)).to.equal(-1);
	});

	it('curry(...) should return 1', function() {
		expect(minusc(0)).to.equal(1);
	});
});

