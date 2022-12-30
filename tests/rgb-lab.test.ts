import {test} from 'uvu'
import assert from 'uvu/assert'

import {rgbToLAB} from '../src'

test('rgb to xyz - base 0,0,0', () => {
	const lab = rgbToLAB(0, 0, 0)
	assert.equal(lab.l, 0)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('rgb to xyz - edge 255,255,255', () => {
	const lab = rgbToLAB(255, 255, 255)

	assert.equal(lab.l, 100)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('rgb to xyz - random rgb(120, 136, 198)', () => {
	const lab = rgbToLAB(120, 136, 198)
	assert.equal(lab.l, 57.73205341273314)
	assert.equal(lab.a, 9.811455919825573)
	assert.equal(lab.b, -34.02835826230108)
})

test.run()
