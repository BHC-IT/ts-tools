export default (func : Function, ...args : any[]) => (...trail : any[]) => func(...args, ...trail);