export type Tail<T extends any[]> = ((...args: T) => void) extends (head: any, ...tail: infer U) => any ? U : never;

export default <T extends any[]>([head, ...tail] : T) : Tail<T> => tail as Tail<T>;
