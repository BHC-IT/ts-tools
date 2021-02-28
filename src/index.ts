import { compose } from './tools/compose';
import { curry } from './tools/curry';
import { drop } from './tools/drop';
import { flip } from './tools/flip';
import { head, Head } from './tools/head';
import { init } from './tools/init';
import { last } from './tools/last';
import { just, nothing, isJust, isNothing, callMaybe } from './tools/maybe';
import { Observable } from './tools/observable';
import { pipe } from './tools/pipe';
import { tail, Tail } from './tools/tail';
import { take } from './tools/take';

import type { Maybe, Just, Nothing } from './types/Maybe';

const call = {...callMaybe};

export type {
	Head,
	Tail,

	Maybe, Just, Nothing,
};

export {
	call,
	compose,
	curry,
	drop,
	flip,
	init,
	head,
	last,
	just, nothing, isJust, isNothing, callMaybe,
	Observable,
	pipe,
	tail,
	take,
};