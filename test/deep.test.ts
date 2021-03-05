import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import { deepCopy } from '../src/tools/deep';

chai.use(chaiAsPromised);

describe('test deepCopy', function() {
	it('deepCopy simple case', function() {
		const test = {
			deep: {
				value: 1
			}
		};

		const copy = deepCopy(test);

		expect(copy).to.eql(test);
	});

	it('deepCopy no deep reference', function() {
		const test = {
			deep: {
				value: 1
			}
		};

		const copy = deepCopy(test);

		test.deep.value = 2;

		expect(copy.deep.value).to.eql(1);
	});

	it('deepCopy with array', function() {
		const test = {
			deep: {
				value: 1,
				array: [
					{obj: [{bottom: 1}, {bottom: 2}]},
					{something: [0, 1, 2]},
				]
			}
		};

		const copy = deepCopy(test);

		expect(copy).to.eql(test);
	});

	it('deepCopy with Date', function() {
		const test = {
			deep: {
				value: 1,
				array: [
					{obj: [{bottom: 1}, {bottom: 2}]},
					{something: [0, 1, 2]},
				]
			},
			someDate : new Date(),
		};

		const copy = deepCopy(test);

		expect(copy).to.eql(test);
	});

	it('deepCopy with custom class', function() {

		class classTest {
			a : number;
			b : number;

			constructor(a : number, b : number) {
				this.a = a;
				this.b = b;
			}
		}

		const test = {
			deep: {
				value: 1,
				array: [
					{obj: [{bottom: 1}, {bottom: 2}]},
					{something: [0, 1, 2]},
				]
			},
			someDate : new classTest(1, 2),
		};

		const copy = deepCopy(test);

		expect(copy).to.eql(test);
	});
});

