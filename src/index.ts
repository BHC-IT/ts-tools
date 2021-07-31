import { compose } from './tools/compose';
import { curry, rcurry } from './tools/curry';
import { copy } from './tools/deep';
import { drop } from './tools/drop';
import { eql } from './tools/eql';
import { flip } from './tools/flip';
import { fmap } from './tools/fmap';
import { head, Head } from './tools/head';
import { init } from './tools/init';
import { last } from './tools/last';
import { Lens, lens, lensFrom, view, set } from './tools/lens';
import { Observable, observe } from './tools/observable';
import { pipe } from './tools/pipe';
import { range } from './tools/range';
import { sleep } from './tools/sleep';
import { tail, Tail } from './tools/tail';
import { take } from './tools/take';
import { tobe, lockFor } from './tools/tobe';

import { Effect, recordType } from './effects/Effect';
import { Maybe } from './effects/Maybe';


export type {
	Head,
	Lens,
	Tail,
};

export {
	// call,
	compose,
	curry, rcurry,
	copy,
	drop,
	eql,
	flip,
	fmap,
	init,
	head,
	last,
	lens, lensFrom, view, set,
	Observable, observe,
	pipe,
	range,
	sleep,
	tail,
	take,
	tobe, lockFor,

	Effect, recordType,
	Maybe,
};
