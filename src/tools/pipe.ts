export default (...fns : Function[]) => fns.reduce((f, g) => (...args : any[]) => g(f(...args)))
