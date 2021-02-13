import { expect } from 'chai';
import head from '../src/tools/head';

describe('test head', function() {
	it('head([1, 2, 3]) should return 1', function() {
		expect(head([1, 2, 3])).to.equal(1);
	});
	it('head([]) should return empty', function() {
		expect(head([])).to.equal(undefined);
	});
});

