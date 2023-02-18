import { always } from './tools/always'
import * as Combinators from './tools/combinators'
import { compose } from './tools/compose'
import { curry, rcurry } from './tools/curry'
import { copy } from './tools/deep'
import { Drop, drop } from './tools/drop'
import { emit } from './tools/emit'
import { eql } from './tools/eql'
import { FlipT, FlipF, flipt, flip } from './tools/flip'
import { fmap } from './tools/fmap'
import {
	forwardTern,
	forwardIf,
	forwardIfAsync,
	forward,
	forwardTernAsync,
} from './tools/forward'
import { head, Head } from './tools/head'
import { init, Init } from './tools/init'
import { last, Last } from './tools/last'
import { Lens, lens, lensFrom, view, set } from './tools/lens'
import { memoise } from './tools/memoise'
import { Observable, observe } from './tools/observable'
import { pipe, pipeAsync } from './tools/pipe'
import { range } from './tools/range'
import { show, showf, showfAsync } from './tools/show'
import { sleep } from './tools/sleep'
import { tail, Tail } from './tools/tail'
import { take } from './tools/take'
import { tobe, lockFor } from './tools/tobe'

import { Effect, recordType } from './effects/Effect'
import { Throwable } from './effects/Throwable'
import { Either } from './effects/Either'

export { maybe, Maybe } from './Monads'
export { task, Task } from './Monads'
export { Monad } from './Monads'
export { M } from './Monads'

import { String } from './namespaces/String'
import { Array } from './namespaces/Array'
import { Pipe } from './namespaces/Pipe'
import { Numeric } from './namespaces/Numeric'

import type {
	Func,
	F,
	Void,
	PureFunction,
	Program,
	EffectfulProgram,
} from './types/Functions'
import type { Identity } from './types/Identity'
import type { Repeat, Length } from './types/Tuple'
import type * as NumericTypes from './types/Numeric'

export type {
	Drop,
	FlipT,
	FlipF,
	Head,
	Tail,
	Init,
	Last,
	Repeat,
	Length,
	Lens,
	Func,
	F,
	Void,
	PureFunction,
	Program,
	EffectfulProgram,
	Identity,
	NumericTypes,
}

export {
	always,
	Combinators,
	compose,
	curry,
	rcurry,
	copy,
	drop,
	emit,
	eql,
	flipt,
	flip,
	fmap,
	forwardTern,
	forwardIf,
	forwardIfAsync,
	forward,
	forwardTernAsync,
	head,
	init,
	last,
	lens,
	lensFrom,
	view,
	set,
	memoise,
	Observable,
	observe,
	pipe,
	pipeAsync,
	range,
	show,
	showf,
	showfAsync,
	sleep,
	tail,
	take,
	tobe,
	lockFor,
	Effect,
	recordType,
	Throwable,
	Either,
	String,
	Array,
	Pipe,
	Numeric,
}
