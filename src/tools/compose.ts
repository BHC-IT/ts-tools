export default (...fns : any[]) => fns.reduce((f, g) => (...args : any[]) => f(g(...args)))
