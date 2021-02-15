import { expect } from 'chai';
import { tail } from '../src/tools/tail';

describe('test tail', function() {
	it('tail([1, 2, 3]) should return [2, 3]', function() {
		expect(tail([1, 2, 3])).to.eql([2, 3]);
	});
	it('tail([]) should return empty', function() {
		expect(tail([])).to.eql([]);
	});
	it('tail([1]) should return empty', function() {
		expect(tail([1])).to.eql([]);
	});

	it('tail return by value', function() {
		const t = [1, 2, 3, 4];
		const tailed = tail(t);

		expect(tailed).to.eql([2, 3, 4]);

		t[1]++;
		tailed[1]++;

		expect(tailed).to.eql([2, 4, 4]);
		expect(t).to.eql([1, 3, 3, 4]);
	});
});

