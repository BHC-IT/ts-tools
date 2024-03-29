import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { Observable, observe } from '../src/tools/observable';

chai.use(chaiAsPromised);

describe('test Observable', function() {
	it('Observable construct & get', function() {
		const observable = new Observable(1);

		expect(observable.get()).to.equal(1);
	});
	it('Observable construct & set & get', function() {
		const observable = new Observable(1);

		observable.set(2);
		expect(observable.get()).to.equal(2);
	});
	it('observable listen', function(done) {
		const observable = new Observable(1);

		const unsub = observable.listen((value : number) => {
			expect(value).to.equal(2);

			unsub();
			done();
		});
		observable.set(2);
	});

	it('observable listen', function(done) {
		const observable = new Observable(1);

		const unsub = observable.listen((value : number) => {
			expect(true).to.equal(false); // should not be called
		});
		observable.listen((value : number) => {
			expect(value).to.equal(2);

			done();
		});
		unsub();
		observable.set(2);
	});

	it('observable change', (done) => {
		const observable = new Observable(0);

		(async () => {
			const new_value = await observable.change();

			expect(new_value).to.equal(1);
			(async () => {
				const new_value = await observable.change();

				expect(new_value).to.equal(2);
				(async () => {
					const new_value = await observable.change();

					expect(new_value).to.equal(3);
					done();
				})();

				observable.set(3);
			})();

			observable.set(2);

		})();

		observable.set(1);

	});

	it('observable change timeout not enforced after 50ms~', (done) => {
		const observable = new Observable(0);
		const time = Date.now();

		(async () => {
			const new_value = await observable.change(50);
			const ellapse = Date.now() - time;

			expect(ellapse >= 50 && ellapse < 60).to.equal(true);
			expect(new_value).to.be.null;

			done();
		})();

	});

	it('observable change timeout enforced after 50ms~', (done) => {
		const observable = new Observable(0);

		(async () => {
			const promise = observable.change(50, true);

			await expect(promise).to.be.rejectedWith("Observable: Timeout on change")

			done();
		})();

	});

	it('observable async for loop with observe', (done) => {
		const observable = new Observable(0);
		let i = 1;

		(async () => {
			for await (let value of observe(observable)) {
				expect(value).to.equal(i);

				if (i === 3){
					done();
					return;
				}
				i++;
			}
		})();

		observable.set(1);
		setTimeout(() => {
			observable.set(2);
			setTimeout(() => {
				observable.set(3);
			}, 10);
		}, 10);
	});

	it('observable async for loop with observe with timeout', (done) => {
		const observable = new Observable(0);
		let i = 1;

		(async () => {
			try {
				for await (let value of observe(observable, 50, true)) {
					expect(value).to.equal(i);

					i++;
				}
			} catch (e : any) {
				expect(e.message).to.equal("Observable: Timeout on change");
				expect(observable.get()).to.equal(3);
				done();
			}
		})();

		observable.set(1);
		setTimeout(() => {
			observable.set(2);
			setTimeout(() => {
				observable.set(3);
			}, 10);
		}, 10);
	});

	it('add too many listener', function() {
		const observable = new Observable(1);

		for (let i = 0; i != 20000; i++) {
			observable.listen((value : number) => {
				expect(true).to.equal(false);
			});
		}
	});
});

describe('test Observable extended', function() {

	class ObservableExtended extends Observable<number> {
		constructor(value : number) {
			super(value);
		}

		protected willUpdate = (value : number, newValue : number) : boolean => !(value === newValue);
		protected shouldCallListener = (value : number, newValue : number) : boolean => !(newValue === 5);
	}

	it('First set should not update observer', function(done) {
		const obs = new ObservableExtended(1);

		const unsub = obs.listen((value : number) => {

			expect(value).to.equal(2);

			unsub();
			done();
		});

		obs.set(1);
		obs.set(2);

	});

	it('First set should not update observer', function(done) {
		const obs = new ObservableExtended(0);

		const unsub = obs.listen((value : number) => {

			expect(value).to.equal(10);

			unsub();
			done();
		});

		obs.set(5);
		obs.set(10);

	});
});

