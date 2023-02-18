export * as maybe from './Maybe'
export { Maybe } from './Maybe'
export * as task from './Task'
export { Task } from './Task'

import { Functor, Applicative, Monad as TmpM } from './TypeConstructors'

const flat = {
	...Functor,
	...Applicative,
	...TmpM,
}

export const M = flat
export const Monad = flat
