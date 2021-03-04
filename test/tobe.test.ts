import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Observable, observe } from '../src/tools/observable';
import { tobe } from '../src/tools/tobe';

chai.use(chaiAsPromised);

describe('test tobe', function() {
	it('tobe simple case', function(done) {
		const observable = new Observable(0);

		(async () => {
			await tobe(observable, (v : number) => v === 5);

			expect(observable.get()).to.equal(5);
			done();
		})();

		observable.set(5);
	});

	it('tobe falsy once', function(done) {
		const observable = new Observable(0);

		(async () => {
			await tobe(observable, (v : number) => v === 5);

			expect(observable.get()).to.equal(5);
			done();
		})();

		observable.set(1);
		setTimeout(() => observable.set(5), 50);
	});

	it('tobe observe simple case', function(done) {
		const observable = new Observable(0);

		(async () => {
			await tobe(observe(observable), (v : number) => v === 5);

			expect(observable.get()).to.equal(5);
			done();
		})();

		observable.set(5);
	});

	it('tobe observe falsy once', function(done) {
		const observable = new Observable(0);

		(async () => {
			await tobe(observe(observable), (v : number) => v === 5);

			expect(observable.get()).to.equal(5);
			done();
		})();

		observable.set(1);
		setTimeout(() => observable.set(5), 50);
	});
});

