// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace String {
	export const charAt = (s: string, i: number) => s.charAt(i)
	export const charCodeAt = (s: string, i: number) => s.charCodeAt(i)
	export const codePointAt = (s: string, i: number) => s.codePointAt(i)
	export const concat = (s: string, ...ss: string[]) => s.concat(...ss)
	export const endsWith = (s: string, c: string, pos?: number) =>
		s.endsWith(c, pos)
	export const includes = (s: string, n: string) => s.includes(n)
	export const indexOf = (s: string, n: string) => s.indexOf(n)
	export const lastIndexOf = (s: string, n: string) => s.lastIndexOf(n)
	export const localeCompare = (
		s: string,
		n: string,
		local?: string | string[],
		params?: object
	) => s.localeCompare(n, local, params) === 1
	export const match = (s: string, n: string | RegExp) => s.match(n)
	export const matchAll = (s: string, n: RegExp) => s.matchAll(n)
	export const normalize = (s: string, n: 'NFC' | 'NFD' | 'NFKC' | 'NFKD') =>
		s.normalize(n)
	export const padEnd = (s: string, n: number, f?: string) => s.padEnd(n, f)
	export const padStart = (s: string, n: number, f?: string) =>
		s.padStart(n, f)
	export const repeat = (s: string, n: number) => s.repeat(n)
	export const replace = (s: string, n: string | RegExp, ns: string) =>
		s.replace(n, ns)
	//	export const replaceAll = (s: string, n: string | RegExp, ns: string) => s.replaceAll(n, ns)
	export const search = (s: string, n: RegExp) => s.search(n)
	export const slice = (s: string, start: number, end?: number) =>
		s.slice(start, end)
	export const split = (s: string, sep: string, end?: number) =>
		s.split(sep, end)
	export const startsWith = (s: string, c?: string, pos?: number) =>
		s.startsWith(c, pos)
	export const substring = (s: string, start: number, end?: number) =>
		s.substring(start, end)
	export const toLocaleLowerCase = (s: string, local: string | string[]) =>
		s.toLocaleLowerCase(local)
	export const toLocaleUpperCase = (s: string, local: string | string[]) =>
		s.toLocaleUpperCase(local)
	export const toLowerCase = (s: string) => s.toLowerCase()
	export const toString = <A>(s: A) => s.toString()
	export const toUpperCase = (s: string) => s.toUpperCase()
	export const trim = (s: string) => s.trim()
	export const trimEnd = (s: string) => s.trimEnd()
	export const trimStart = (s: string) => s.trimStart()
	export const valueOf = (s: string) => s.valueOf()
}
