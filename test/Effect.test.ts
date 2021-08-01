import { expect } from 'chai';

import { Effect } from '../src/effects/Effect';

class Ext extends Effect<any> {
}

describe('test Maybe', function() {

	it('Effect identity, test from Maybe', function() {
		const e = new Ext();

		expect(e.identity()).to.eql(Effect);
	});

});
