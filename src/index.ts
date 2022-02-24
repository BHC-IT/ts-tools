import { always } from './tools/always';
import * as Combinators from './tools/combinators';
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
import { init, Init } from './tools/init';
import { last, Last } from './tools/last';
import { Lens, lens, lensFrom, view, set } from './tools/lens';
import { memoise } from './tools/memoise';
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
import { Either } from './effects/Either';

import { String } from './namespaces/String';
import { Array } from './namespaces/Array';
import { Pipe } from './namespaces/Pipe';

import { Func, F, Void, PureFunction, Program,  EffectfulProgram } from './types/Functions';
import { Identity } from './types/Identity';

export type {
	Head,
	Tail,
	Init,
	Last,

	Lens,

	Func, F, Void, PureFunction, Program,  EffectfulProgram,
	Identity,
};

export {
	always,
	Combinators,
	compose,
	curry, rcurry,
	copy,
	drop,
	emit,
	eql,
	flip,
	fmap,
	forwardTern, forwardIf, forwardIfAsync, forward, forwardTernAsync,
	head,
	init,
	last,
	lens, lensFrom, view, set,
	memoise,
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
	Either,

	String,
	Array,
	Pipe,
};
