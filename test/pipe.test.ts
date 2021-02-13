import { expect } from 'chai';
import pipe from '../src/tools/pipe';

const result = pipe((x : number) => x + 1, (x : number) => x * 2, (x : number) => x - 1);

describe('test pipe', function() {
	it('pipe(...) should return 1', function() {
		expect(result(0)).to.equal(1);
	});
	it('pipe(...) should return 3', function() {
		expect(result(1)).to.equal(3);
	});
	it('pipe(...) should return 5', function() {
		expect(result(2)).to.equal(5);
	});
});

