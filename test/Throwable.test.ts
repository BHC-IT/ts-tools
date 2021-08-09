import { expect } from 'chai';

import { Throwable } from '../src/effects/Throwable';
import { Effect } from '../src/effects/Effect';

import { emit } from '../src/tools/emit';

describe('test Throwable', function() {

	it('check instance', function() {
		const i : Throwable<number> = Throwable.resolved(0);

		expect(i instanceof Effect).to.equal(true);
		expect(i instanceof Throwable).to.equal(true);
	});

	it('isResolved of resolved', function() {
		const i : Throwable<number> = Throwable.resolved(0);

		expect(i.isResolved()).to.equal(true);
	});
	it('isResolved of thrown', function() {
		let i : Throwable<number> = Throwable.thrown(new Error('test'));

		expect(Throwable.isResolved(i)).to.equal(false);
	});

	it('isNothing of resolved', function() {
		const i : Throwable<number> = Throwable.resolved(0);

		expect(i.isThrown()).to.equal(false);
	});

	it('isNothing of thrown', function() {
		let i : Throwable<number> = Throwable.thrown(new Error('test'));

		expect(Throwable.isThrown(i)).to.equal(true);
	});

	it ('Throwable for resolved when resolved', function() {
		const i : Throwable<number> = Throwable.resolved(0);

		const res = i.fmap((e : number) => e + 1);
		expect(res.fromResolved()).to.equal(1);
	});

	it ('Throwable for resolved when thrown', function() {
		const i : Throwable<number> = Throwable.thrown(new Error('test'));;

		const res = i.fmap((e : number) => e + 1);
		expect(res.fromThrown().message).to.eql('test');
	});

	it ('Throwable lift', function() {
		const i : Throwable<number> = Throwable.from(0);
		const inc = (e : number) => e + 1;
		const minc = Throwable.lift(inc);

		const res = minc(i);

		Throwable.fmap((e : number) => expect(e).to.equal(1), res);
	});

	it ('Throwable from error', function() {
		const i = Throwable.from(new Error('test'));

		expect([(i as any).record[0], (i as any).record[1].message]).to.eql([false, 'test']);
	});

	it ('Throwable identity', function() {
		const i = Throwable.from(0);

		expect(i.identity()).to.equal(Throwable);
	});

	it ('Throwable isValide', function() {
		const i = Throwable.from(0);

		expect(i.isValide()).to.equal(true);
	});

	it ('Throwable fromResolved of resolved', function() {
		const i = Throwable.resolved(0);

		expect(Throwable.fromResolved(i)).to.equal(0);
	});

	it ('Throwable fromResolved of thrown', function() {
		const i = Throwable.thrown('test');

		expect(() => Throwable.fromResolved(i)).to.throws();
	});

	it ('Throwable fromThrown of resolved', function() {
		const i = Throwable.resolved(0);

		expect(() => Throwable.fromThrown(i)).to.throws();
	});

	it ('Throwable fromThrown of thrown', function() {
		const i = Throwable.thrown('test');

		expect(Throwable.fromThrown(i).message).to.equal('test');
	});

	it ('Throwable fromThrowable of resolved', function() {
		const i = Throwable.resolved(0);

		expect(i.fromThrowable(1)).to.equal(0);
	});

	it ('Throwable fromThrowable of thrown', function() {
		const i = Throwable.thrown('test');

		expect(Throwable.fromThrowable(1, i)).to.equal(1);
	});

	it ('Throwable listToThrowable', function() {
		const i = Throwable.listToThrowable([0, 1]);

		expect(Throwable.fromThrowable(1, i)).to.equal(0);
	});

	it ('Throwable listToThrowable empty list', function() {
		const i = Throwable.listToThrowable([]);

		expect(Throwable.fromThrowable(1, i)).to.equal(1);
	});

	it ('Throwable ThrowableToList resolved', function() {
		const i = Throwable.resolved(1);

		expect(i.ThrowableToList()).to.eql([1]);
	});

	it ('Throwable ThrowableToList thrown', function() {
		const i = Throwable.thrown('test');

		expect(Throwable.ThrowableToList(i)).to.eql([]);
	});

	it ('Throwable catThrowable', function() {
		const i = [Throwable.resolved(1), Throwable.thrown('test'), Throwable.resolved(2)];

		expect(Throwable.catThrowables(i)).to.eql([1, 2]);
	});

	it ('Throwable identity', function() {

		expect(Throwable.resolved(0).identity()).to.eql(Throwable);
	});

	it ('Throwable mapThrowable', function() {
		const f = (a: number) => a % 2 === 0 ? Throwable.resolved(a) : Throwable.thrown('test');

		const bs = Throwable.mapThrowable(f, [0, 1, 2, 3, 4, 5]);

		expect(bs).to.eql([0, 2, 4]);
	});

	it ('Throwable liftFromThrowable', function() {
		const f = (a: number) => a % 2 === 0 ? a : emit('');

		const fm = Throwable.liftFromThrowable(f);

		const a = fm(0);
		const b = fm(1);

		expect(Throwable.fromResolved(a)).to.eql(0);

		expect(Throwable.isThrown(b)).to.equal(true);
	});

	it ('Throwable liftFromThrowableAsync', async function() {
		const f = async (a: number) => a % 2 === 0 ? a : emit('');

		const fm = Throwable.liftFromThrowableAsync(f);

		const a = fm(0);
		const b = fm(1);

		expect(Throwable.fromResolved(await a)).to.eql(0);

		expect(Throwable.isThrown(await b)).to.equal(true);
	});

	it ('Throwable case 1', async function() {
		let i = 0;
		const f = (a: number) => i = a;
		const n = () => i = -1;

		const m = Throwable.resolved(1);

		m.case(f, n);

		expect(i).to.equal(1);
	});

	it ('Throwable case 2', async function() {
		let i = 0;
		const f = (a: number) => i = a;
		const n = () => i = -1;

		const m = Throwable.thrown('test');

		m.case(f, n);

		expect(i).to.equal(-1);
	});
});

