import { expect, describe, it } from 'vitest'

import { String } from '../../src/index'

describe('test String', function () {
	it('charAt', function () {
		expect(String.charAt('test', 0)).to.eql('t')
	})

	it('charCodeAt', function () {
		expect(String.charCodeAt('test', 0)).to.eql(116)
	})

	it('codePointAt', function () {
		expect(String.codePointAt('test', 0)).to.eql(116)
	})

	it('concat', function () {
		expect(String.concat('a', 'b')).to.eql('ab')
		expect(String.concat('a', 'b', 'c', 'd')).to.eql('abcd')
	})

	it('endsWith', function () {
		expect(String.endsWith('test', 't')).to.eql(true)
	})

	it('includes', function () {
		expect(String.includes('test', 'te')).to.eql(true)
		expect(String.includes('test', 'tets')).to.eql(false)
	})

	it('indexOf', function () {
		expect(String.indexOf('test', 't')).to.eql(0)
		expect(String.indexOf('test', 'e')).to.eql(1)
	})

	it('lastIndexOf', function () {
		expect(String.lastIndexOf('test', 't')).to.eql(3)
		expect(String.lastIndexOf('test', 'e')).to.eql(1)
	})

	it('localeCompare', function () {
		expect(String.localeCompare('TEST', 'test', 'en')).to.eql(true)
		expect(String.localeCompare('TestE', 'testé', 'fr')).to.eql(false)
	})

	it('match', function () {
		expect(String.match('test', 'es')).to.eql(['es'])
		expect(String.match('test', 'esx')).to.eql(null)
	})

	it('matchAll', function () {
		expect([...String.matchAll('test', /o/g)]).to.eql([])
		expect([...String.matchAll('test', /tes/g)]).to.eql([['tes']])
	})

	it('normalize', function () {
		expect(String.normalize('test', 'NFC')).to.eql('test')
	})

	it('padEnd', function () {
		const test = 'test'

		expect(String.padEnd(test, test.length + 2, 's')).to.eql('testss')
		expect(test).to.eql('test')
	})

	it('padStart', function () {
		const test = 'test'

		expect(String.padStart(test, test.length + 2, 's')).to.eql('sstest')
		expect(test).to.eql('test')
	})

	it('repeat', function () {
		expect(String.repeat('test', 4)).to.eql('testtesttesttest')
	})

	it('replace', function () {
		expect(String.replace('test', 'e', 's')).to.eql('tsst')
	})

	/*	it('replaceAll', function() {
		expect(String.replaceAll("test", "t", "e")).to.eql("eese");
	}); */

	it('search', function () {
		expect(String.search('test', /o/g)).to.eql(-1)
		expect(String.search('test', /t/g)).to.eql(0)
	})

	it('slice', function () {
		const test = 'test'

		expect(String.slice(test, 0, 2)).to.eql('te')
		expect(test).to.eql('test')
	})

	it('split', function () {
		const test = 'test'

		expect(String.split(test, 'e')).to.eql(['t', 'st'])
		expect(test).to.eql('test')
	})

	it('startsWith', function () {
		expect(String.startsWith('test', 't')).to.eql(true)
	})

	it('substring', function () {
		const test = 'test'

		expect(String.substring(test, 1, 3)).to.eql('es')
		expect(test).to.eql('test')
	})

	it('toLocaleLowerCase', function () {
		const test = '\u0130'
		expect(
			String.toLocaleLowerCase(test, 'en-US') !==
				String.toLocaleLowerCase(test, 'tr')
		).to.eql(true)
	})

	it('toLocaleUpperCase', function () {
		const test = 'istanbul'

		expect(
			String.toLocaleUpperCase(test, 'en-US') !==
				String.toLocaleUpperCase(test, 'tr')
		).to.eql(true)
	})

	it('toLowerCase', function () {
		const test = 'TEST'

		expect(String.toLowerCase(test)).to.eql('test')
		expect(test).to.eql('TEST')
	})

	it('toString', function () {
		const test = Buffer.from('test')

		expect(String.toString(test)).to.eql('test')
	})

	it('toUpperCase', function () {
		const test = 'test'

		expect(String.toUpperCase(test)).to.eql('TEST')
		expect(test).to.eql('test')
	})

	it('trim', function () {
		const test = ' \n test \n '

		expect(String.trim(test)).to.eql('test')
		expect(test).to.eql(' \n test \n ')
	})

	it('trimEnd', function () {
		const test = ' \n test \n '

		expect(String.trimEnd(test)).to.eql(' \n test')
		expect(test).to.eql(' \n test \n ')
	})

	it('trimStart', function () {
		const test = ' \n test \n '

		expect(String.trimStart(test)).to.eql('test \n ')
		expect(test).to.eql(' \n test \n ')
	})

	it('valueOf', function () {
		const test = 'test'

		expect(String.valueOf(test)).to.eql('test')
	})
})
