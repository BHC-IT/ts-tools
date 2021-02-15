export default (...fns : Function[]) => fns.reduce((f, g) => (...args : any[]) => f(g(...args)))
