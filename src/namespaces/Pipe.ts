import { forward } from '../tools/forward'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Pipe {
	export const skipIf = <A>(f:(_1: A) => A, pred:(_1: A) => boolean ) => (arg: A) => pred(arg) ? f(arg) : arg
	export const discard = <A, B>(f:(_1: A) => B) => (arg: A) => forward(f(arg), () => arg)
}
