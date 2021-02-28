import { expect } from 'chai';
import { Observable } from '../src/tools/observable';

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

	it('add to many listener', function() {
		const observable = new Observable(1);

		for (let i = 0; i != 20000; i++) {
			observable.listen((value : number) => {
				expect(true).to.equal(false);
			});
		}
	});
});

describe('test Observable extended', function() {

	class ObservableExtended<T> extends Observable<T> {
		constructor(value : T) {
			super(value);
		}

		protected willUpdate = (value : T, newValue : T) : boolean => !(value === newValue);		
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
});

