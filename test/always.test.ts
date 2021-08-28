import { expect } from 'chai';

import { always } from '../src/index';


describe('test always', function() {

	it('always', function() {
		const alwOne = always(1);

		expect(alwOne()).to.equal(1);
	});

});

