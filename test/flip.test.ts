import { expect } from 'chai';
import { flip } from '../src/tools/flip';

const addstr = (str1 : string, str2 : string) => str1 + str2;

const addflip = flip(addstr);


describe('test curry', function() {
	it('reverse(...) should return 1', function() {
		expect(addstr("a", "b")).to.equal("ab");
		expect(addflip("a", "b")).to.equal("ba");
	});
});

