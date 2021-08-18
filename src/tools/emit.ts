const emitError = (e : Error) => {throw e}

const emitString = (s: string) => {throw new Error(s)}

export const emit = (s : string | Error) : never => s instanceof Error ? emitError(s) : emitString(s)