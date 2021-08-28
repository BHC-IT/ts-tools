import { always } from './tools/always';
import { compose } from './tools/compose';
import { curry, rcurry } from './tools/curry';
import { copy } from './tools/deep';
import { drop } from './tools/drop';
import { emit } from './tools/emit';
import { eql } from './tools/eql';
import { flip } from './tools/flip';
import { fmap } from './tools/fmap';
import { forwardTern, forwardIf, forwardIfAsync, forward, forwardTernAsync } from './tools/forward';
import { head, Head } from './tools/head';
import { init } from './tools/init';
import { last } from './tools/last';
import { Lens, lens, lensFrom, view, set } from './tools/lens';
import { Observable, observe } from './tools/observable';
import { pipe, pipeAsync, pipeEffect, pipeEffectAsync } from './tools/pipe';
import { range } from './tools/range';
import { show, showf, showfAsync } from './tools/show';
import { sleep } from './tools/sleep';
import { tail, Tail } from './tools/tail';
import { take } from './tools/take';
import { tobe, lockFor } from './tools/tobe';

import { Effect, recordType } from './effects/Effect';
import { Maybe } from './effects/Maybe';
import { Throwable } from './effects/Throwable';

import { String } from './namespaces/String';
import { Array } from './namespaces/Array';

import { Func, F, Void, PureFunction, Program,  EffectfulProgram } from './types/Functions';
import { Identity } from './types/Identity';

export type {
	Head,
	Lens,
	Tail,

	Func, F, Void, PureFunction, Program,  EffectfulProgram,
	Identity,
};

export {
	always,
	compose,
	curry, rcurry,
	copy,
	drop,
	emit,
	eql,
	flip,
	fmap,
	forwardTern, forwardIf, forwardIfAsync, forward, forwardTernAsync,
	init,
	head,
	last,
	lens, lensFrom, view, set,
	Observable, observe,
	pipe, pipeAsync, pipeEffect, pipeEffectAsync,
	range,
	show, showf, showfAsync,
	sleep,
	tail,
	take,
	tobe, lockFor,

	Effect, recordType,
	Maybe,
	Throwable,

	String,
	Array,
};

const mmap = <C extends {forEach: Function}>(f:(e: any) => any, m: C) => {
	const arr: [any, any][] = [];

	m.forEach((v: any, i: any) =>
		arr.push([i, f(v)])
	)

	return new Map(arr as any)
}

const test = new Map([[0, '0'], [1, '1']])
const test2 = [0, 1]

console.log(test)
console.log(mmap((e) => e + 1, test))
console.log(mmap((e) => e + 1, test2))
