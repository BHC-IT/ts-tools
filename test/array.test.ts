import { expect } from 'chai'

import { Array } from '../src/index'

/*
export const values = <A>(arr: Array<A>) => arr.values()
*/

describe('test Array', function () {
	it('concat', function () {
		const arr = [0, 1, 2, 3]
		expect(Array.concat(arr, arr)).to.eql([0, 1, 2, 3, 0, 1, 2, 3])
		expect(arr).to.eql([0, 1, 2, 3])
	})

	it('copyWithin', function () {
		const arr = [0, 1, 2, 3]
		expect(Array.copyWithin(arr)).to.eql([0, 1, 2, 3])
		expect(Array.copyWithin(arr, 0)).to.eql([0, 1, 2, 3])
		expect(Array.copyWithin(arr, 0, 1)).to.eql([1, 2, 3, 3])
		expect(Array.copyWithin(arr, 0, 1, 2)).to.eql([1, 1, 2, 3])
		expect(arr).to.eql([0, 1, 2, 3])
	})

	it('entries', function () {
		const arr = [2, 1, 2, 5]
		expect([...Array.entries(arr)]).to.eql([
			[0, 2],
			[1, 1],
			[2, 2],
			[3, 5],
		])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('every', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.every(arr, e => e > 2)).to.eql(false)
		expect(Array.every(arr, e => e >= 1)).to.eql(true)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('fill', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.fill(arr, 5)).to.eql([5, 5, 5, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('filter', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.filter(arr, e => e > 2)).to.eql([5])
		expect(Array.filter(arr, e => e >= 2)).to.eql([2, 2, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('find', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.find(arr, e => e > 2)).to.eql(5)
		expect(Array.find(arr, e => e >= 1)).to.eql(2)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('findIndex', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.findIndex(arr, e => e > 2)).to.eql(3)
		expect(Array.findIndex(arr, e => e >= 1)).to.eql(0)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('flat', function () {
		const arr = [
			[2, 0],
			[1, 1],
			[2, 2],
			[5, 3],
		]
		expect(Array.flat(arr)).to.eql([2, 0, 1, 1, 2, 2, 5, 3])
		expect(arr).to.eql([
			[2, 0],
			[1, 1],
			[2, 2],
			[5, 3],
		])
	})

	it('flatMap', function () {
		const arr = [
			[2, 0],
			[1, 1],
			[2, 2],
			[5, 3],
		]
		expect(Array.flatMap(arr, e => [e[0] + 1, e[1] + 2])).to.eql([
			3, 2, 2, 3, 3, 4, 6, 5,
		])
		expect(arr).to.eql([
			[2, 0],
			[1, 1],
			[2, 2],
			[5, 3],
		])
	})

	it('findIndex', function () {
		const arr = [2, 1, 2, 5]
		const test: number[] = []
		Array.forEach(arr, (e, i) => (test[i] = e))
		expect(arr).to.eql([2, 1, 2, 5])
		expect(test).to.eql([2, 1, 2, 5])
	})

	it('includes', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.includes(arr, 1)).to.eql(true)
		expect(Array.includes(arr, 1, 2)).to.eql(false)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('indexOf', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.indexOf(arr, 1)).to.eql(1)
		expect(Array.indexOf(arr, 1, 2)).to.eql(-1)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('join', function () {
		const arr = ['2', '1', '2', '5']
		expect(Array.join(arr, ';')).to.eql('2;1;2;5')
		expect(Array.join(arr)).to.eql('2,1,2,5')
		expect(arr).to.eql(['2', '1', '2', '5'])
	})

	it('keys', function () {
		const arr = ['2', '1', '2', '5']
		expect([...Array.keys(arr)]).to.eql([0, 1, 2, 3])
		expect(arr).to.eql(['2', '1', '2', '5'])
	})

	it('lastIndexOf', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.lastIndexOf(arr, 5)).to.eql(3)
		expect(Array.lastIndexOf(arr, 2)).to.eql(2)
		expect(Array.lastIndexOf(arr, 1, 0)).to.eql(-1)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('map', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.map(arr, e => e * 2)).to.eql([4, 2, 4, 10])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('pop', function () {
		const arr = [0, 1, 2, 3]
		expect(Array.pop(arr)).to.eql([0, 1, 2])
		expect(arr).to.eql([0, 1, 2, 3])
	})

	it('push', function () {
		const arr = [0, 1, 2, 3]
		expect(Array.push(arr, 1, 2)).to.eql([0, 1, 2, 3, 1, 2])
		expect(arr).to.eql([0, 1, 2, 3])
	})

	it('reduce', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.reduce(arr, (a: number, e) => a + e, 0)).to.eql(10)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('reduceRight', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.reduceRight(arr, (a: number, e) => a + e, 0)).to.eql(10)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('reverse', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.reverse(arr)).to.eql([5, 2, 1, 2])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('shift', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.shift(arr)).to.eql([1, 2, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('slice', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.slice(arr)).to.eql([2, 1, 2, 5])
		expect(Array.slice(arr, 1)).to.eql([1, 2, 5])
		expect(Array.slice(arr, 1, 2)).to.eql([1])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('some', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.some(arr, e => e === 2)).to.eql(true)
		expect(Array.some(arr, e => e === 0)).to.eql(false)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('sort', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.sort(arr)).to.eql([1, 2, 2, 5])
		expect(Array.sort(arr, (a, b) => b - a)).to.eql([5, 2, 2, 1])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('splice', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.splice(arr)).to.eql([2, 1, 2, 5])
		expect(Array.splice(arr, 1)).to.eql([1, 2, 5])
		expect(Array.splice(arr, 1, 2)).to.eql([1, 2])
		expect(Array.splice(arr, 1, 2, 10)).to.eql([1, 2])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('toLocaleString', function () {
		const arr = [new Date()]
		expect(Array.toLocaleString(arr)).to.eql(arr.toLocaleString())
	})

	it('toString', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.toString(arr)).to.eql('2,1,2,5')
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('unshift', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.unshift(arr, 10)).to.eql([10, 2, 1, 2, 5])
		expect(Array.unshift(arr, 10, 20)).to.eql([10, 20, 2, 1, 2, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('unshift', function () {
		const arr = [2, 1, 2, 5]
		expect([...Array.values(arr)]).to.eql([2, 1, 2, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('head', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.head(arr)).to.eql(2)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('tail', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.tail(arr)).to.eql([1, 2, 5])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('init', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.init(arr)).to.eql([2, 1, 2])
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('last', function () {
		const arr = [2, 1, 2, 5]
		expect(Array.last(arr)).to.eql(5)
		expect(arr).to.eql([2, 1, 2, 5])
	})

	it('repeat', function () {
		expect(Array.repeat(0, 5)).to.eql([0, 0, 0, 0, 0])
	})

	it('zip', function () {
		expect(Array.zip([0, 1, 2], ['0', '1', '2'])).to.eql([
			[0, '0'],
			[1, '1'],
			[2, '2'],
		])
	})
})
