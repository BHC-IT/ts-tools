import { expect, describe, it } from 'vitest'

import { lensFrom, view, set } from '../../src/Lens/lens'

describe('test lens', function () {
	it('lens simple case', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 0 }]
				}
			}
		}

		const testLensFrom = lensFrom('test.here.deep.value')

		expect(view(testLensFrom, test)).to.eql(0)
	})

	it('lens tuple with index in it', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 1 }]
				}
			}
		}

		const testLensFrom = lensFrom(['test', 'here', 'arr', 0, 'value'])

		expect(view(testLensFrom, test)).to.eql(1)
	})

	it('lens string with index in it', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 1 }]
				}
			}
		}

		const testLensFrom = lensFrom('test.here.arr.0.value')

		expect(view(testLensFrom, test)).to.eql(1)
	})

	it('lens string with index in it and none default spliter', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 1 }]
				}
			}
		}

		const testLensFrom = lensFrom('test/here/arr/0/value', '/')

		expect(view(testLensFrom, test)).to.eql(1)
	})

	it('lens none existing fields', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 1 }]
				}
			}
		}

		const testLensFrom = lensFrom('test.nothere.here.arr.0.value')

		expect(view(testLensFrom, test)).to.eql(undefined)
	})
})

describe('test lens & set', function () {
	it('set simple case', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 0 }]
				}
			}
		}

		const testLensFrom = lensFrom('test.here.deep.value')

		const new_obj = set(testLensFrom, 2, test)
		expect(view(testLensFrom, test)).to.eql(0)
		expect(view(testLensFrom, new_obj)).to.eql(2)
	})

	it('set none existing fields', function () {
		const test = {
			test: {
				here: {
					deep: {
						value: 0
					},
					arr: [{ value: 1 }]
				}
			}
		}

		const testLensFrom = lensFrom('test.nothere.here.arr.0.value')

		const new_obj = set(testLensFrom, 2, test)
		expect(view(testLensFrom, new_obj)).to.eql(undefined)
		expect(new_obj).to.eql(test)
	})
})
