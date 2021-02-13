import { expect } from 'chai';
import compose from '../src/tools/compose';

const result = compose((x : number) => x + 1, (x : number) => x * 2, (x : number) => x - 1);

describe('test compose', function() {
	it('compose(...) should return -1', function() {
		expect(result(0)).to.equal(-1);
	});
	it('compose(...) should return 1', function() {
		expect(result(1)).to.equal(1);
	});
	it('compose(...) should return 3', function() {
		expect(result(2)).to.equal(3);
	});
});

