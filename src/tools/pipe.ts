export default (...fns : any[]) => fns.reduce((f, g) => (...args : any[]) => g(f(...args)))
