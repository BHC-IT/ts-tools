import type { Drop } from '../index'
import type { Repeat } from '../index'

export type Next<I extends number> = I extends 0 ? 1 : [...Repeat<1, I>, 1] extends {length: infer U} ? U extends number ? U : never : never
export type Add<I extends number, J extends number> = [...Repeat<1, I>, ...Repeat<1, J>] extends {length: infer U} ? U extends number ? U : never : never
export type Minus<I extends number, J extends number> = Drop<Repeat<1, I>, J> extends {length: infer U} ? U extends number ? U : never : never
export type Prev<I extends number> = Minus<I, 1>
export type Mult<I extends number, J extends number> = J extends 0 ? 0 : J extends 1 ? I : Add<I, Mult<I, Minus<J, 1>>>
export type Gt<I extends number, J extends number> = I extends 0 ? false : J extends 0 ? true : Gt<Minus<I, 1>, Minus<J, 1>>
export type Gte<I extends number, J extends number> = I extends 0 ? (J extends 0 ? true : false) : J extends 0 ? true : Gte<Minus<I, 1>, Minus<J, 1>>
export type Lt<I extends number, J extends number> = Gt<J, I>
export type Lte<I extends number, J extends number> = Gte<J, I>
export type Eql<I extends number, J extends number> = I extends J ? true : false

export type ProduceTo<I extends number> = I extends 0 ? I : ProduceTo<Prev<I>> | I

