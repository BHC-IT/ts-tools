import { expect } from 'chai';
import init from '../src/tools/init';

describe('test init', function() {
	it('init([1, 2, 3]) should return [1, 2]', function() {
		expect(init([1, 2, 3])).to.eql([1, 2]);
	});
	it('init([]) should return empty', function() {
		expect(init([])).to.eql([]);
	});
	it('init([1]) should return [1]', function() {
		expect(init([1])).to.eql([]);
	});

	it('init return by value', function() {
		const t = [1, 2, 3, 4];
		const inited = init(t);

		expect(inited).to.eql([1, 2, 3]);

		t[1]++;
		inited[1]++;

		expect(inited).to.eql([1, 3, 3]);
		expect(t).to.eql([1, 3, 3, 4]);
	});
});

