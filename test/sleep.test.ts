import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { sleep } from '../src/tools/sleep';

chai.use(chaiAsPromised);

describe('test sleep', function() {
	it('sleep simple case', function(done) {
		const time = Date.now();

		(async () => {
			await sleep(100);

			const ellapsed = Date.now() - time;
			expect(ellapsed >= 100 && ellapsed < 110).to.equal(true);

			done();
		})();

	});

	it('sleep double case', function(done) {
		const time = Date.now();

		(async () => {
			await sleep(100);
			await sleep(100);

			const ellapsed = Date.now() - time;
			expect(ellapsed >= 200 && ellapsed < 220).to.equal(true);

			done();
		})();

	});
});

