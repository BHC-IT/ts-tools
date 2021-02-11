import addon from '../bindings/base';
import { expect } from 'chai';

describe( 'Test base API', () => {
	it( 'should return `test`', () => {
		const result = addon.base( 'test' );
		expect(result).to.equal('test');
	} );
} );