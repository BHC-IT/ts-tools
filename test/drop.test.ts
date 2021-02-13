import { expect } from 'chai';
import drop from '../src/tools/drop';


describe('test drop', function() {
	it('drop(1, [1,2,3,4]) should return [1]', function() {
		expect(drop(1, [1,2,3,4])).to.eql([2,3,4]);
	});
	it('drop(3, [1,2,3,4]) should return [1,2,3]', function() {
		expect(drop(3, [1,2,3,4])).to.eql([4]);
	});
	it('drop(5, [1,2,3,4]) should return [1,2,3,4]', function() {
		expect(drop(5, [1,2,3,4])).to.eql([]);
	});
});

