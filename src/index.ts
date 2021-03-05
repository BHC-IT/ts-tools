import { compose } from './tools/compose';
import { curry } from './tools/curry';
import { deepCopy } from './tools/deep';
import { drop } from './tools/drop';
import { flip } from './tools/flip';
import { head, Head } from './tools/head';
import { init } from './tools/init';
import { last } from './tools/last';
import { Lens, lens, lensFrom, view, set } from './tools/lens';
import { just, nothing, isJust, isNothing, callMaybe } from './tools/maybe';
import { Observable, observe } from './tools/observable';
import { pipe } from './tools/pipe';
import { range } from './tools/range';
import { sleep } from './tools/sleep';
import { tail, Tail } from './tools/tail';
import { take } from './tools/take';
import { tobe, lockFor } from './tools/tobe';

import type { Maybe, Just, Nothing } from './types/Maybe';

const call = {...callMaybe};

export type {
	Head,
	Lens,
	Tail,

	Maybe, Just, Nothing,
};

export {
	call,
	compose,
	curry,
	deepCopy,
	drop,
	flip,
	init,
	head,
	last,
	lens, lensFrom, view, set,
	just, nothing, isJust, isNothing, callMaybe,
	Observable, observe,
	pipe,
	range,
	sleep,
	tail,
	take,
	tobe, lockFor,
};
