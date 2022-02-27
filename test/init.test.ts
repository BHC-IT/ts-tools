import { expect } from 'chai';
import { init } from '../src/tools/init';

describe('test init', function() {
	it('init([1, 2, 3]) should return [1, 2]', function() {
		const res = init([1, 2, 3]);
		expect(res).to.eql([1, 2]);
	});
	it('init([]) should return empty', function() {
		expect(init([])).to.eql([]);
	});
	it('init([1]) should return [1]', function() {
		expect(init([1])).to.eql([]);
	});

	it('init return by value', function() {
		const t: [number, string, number, string] = [1, '2', 3, '4'];
		const inited = init(t);

		expect(inited).to.eql([1, '2', 3]);

		t[0]++;
		inited[0]++;

		expect(inited).to.eql([2, '2', 3]);
		expect(t).to.eql([2, '2', 3, '4']);
	});
});

