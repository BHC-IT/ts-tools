export type Head<T extends any[]> = T extends [infer U, ...any[]] ? U : never;

export default <T extends any[]>([head, ...tail] : T) : Head<T> => head as Head<T>;
