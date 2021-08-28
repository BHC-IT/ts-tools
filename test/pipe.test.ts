import { expect } from 'chai';
import { pipe, pipeAsync, pipeEffect, pipeEffectAsync, Maybe, Throwable } from '../src/index';

const result = pipe((x : number) => x + 1, (x : number) => x * 2, (x : number) => x - 1);
const test = pipe((x : number, y: string) => x + Number.parseInt(y) + 1, (x : number) => x * 2, (x : number) => x - 1);
const resultAsync = pipeAsync(async (x : number) => x + 1, async (x : number) => x * 2, (x : number) => x - 1);
const resultEffectWithEffect = pipeEffect((x : number) => x + 1, (x : number) => x === 0 ? Maybe.nothing : Maybe.just(x), (x : number) => Maybe.just(x - 1));
const resultEffectAsync = pipeEffectAsync(async (x : number) => x + 1, async (x : number) => x === 0 ? Maybe.nothing : Maybe.just(x), async (x : number) => Maybe.just(x - 1));
const resultEffectAsyncT = pipeEffectAsync(async (x : number) => x + 1, async (x : number) => x === 0 ? Throwable.thrown('test') : Throwable.resolved(x), async (x : number) => Maybe.just(x - 1));

describe('test pipe', function() {
	it('pipe(...) should return 1', function() {
		expect(result(0)).to.equal(1)
	});
	it('pipe(...) should return 3', function() {
		expect(result(1)).to.equal(3)
	});
	it('pipe(...) should return 5', function() {
		expect(result(2)).to.equal(5)
	});
	it('pipe(...) should return 5, typecheck', function() {
		const i: number = test(2, "0")

		expect(i).to.equal(5)
	});

	it('pipeAsync(...) should return 5', async function() {
		const i: number = await resultAsync(2)

		expect(i).to.equal(5)
	});

	it('pipeEffect(...) should return Maybe.nothing', function() {
		const i: Maybe<number> = resultEffectWithEffect(-1)

		expect(i.isNothing()).to.equal(true)
	});

	it('pipeEffect(...) should return Maybe.just(1)', function() {
		const i: Maybe<number> = resultEffectWithEffect(1)

		expect(i.fromMaybe(0)).to.equal(1)
	});

	it('pipeEffectAsync(...) should return Maybe.nothing', async function() {
		const i: Maybe<number> = await resultEffectAsync(-1)

		expect(i.isNothing()).to.equal(true)
	});

	it('pipeEffectAsync(...) should return Maybe.just(1)', async function() {
		const i: Maybe<number> = await resultEffectAsync(1)

		expect(i.fromMaybe(0)).to.equal(1)
	});

	it('resultEffectAsyncT(...) should return Maybe.nothing', async function() {
		const i: Throwable<number> = await resultEffectAsyncT(-1) as any as Throwable<number>

		expect(i.isThrown()).to.equal(true)
	});

	it('resultEffectAsyncT(...) should return Maybe.just(1)', async function() {
		const i: Maybe<number> = await resultEffectAsyncT(1)

		expect(i.fromMaybe(0)).to.equal(1)
	});
});

