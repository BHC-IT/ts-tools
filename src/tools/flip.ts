
export default <T>(fn: (...args: any[]) => T) : typeof fn => {
	return (...args: any[]): T => fn(...args.reverse() as any)
}
