import {test} from 'uvu'
import assert from 'uvu/assert'

import {labToRGB, rgbToLAB} from '../src'

test('rgb to lab - base 0,0,0', () => {
	const lab = rgbToLAB(0, 0, 0)
	assert.equal(lab.l, 0)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('rgb to lab - edge 255,255,255', () => {
	const lab = rgbToLAB(255, 255, 255)

	assert.equal(lab.l, 100)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('rgb to lab - random rgb(120, 136, 198)', () => {
	const lab = rgbToLAB(120, 136, 198)
	assert.equal(lab.l, 57.73205341273314)
	assert.equal(lab.a, 9.82294618851859)
	assert.equal(lab.b, -34.032854824631876)
})

test('lab to rgb - base 0,0,0', () => {
	const lab = rgbToLAB(0, 0, 0)
	const rgb = labToRGB(lab.l, lab.a, lab.b)
	assert.equal(rgb.r, 0)
	assert.equal(rgb.g, 0)
	assert.equal(rgb.b, 0)
})

test('lab to rgb - edge 255,255,255', () => {
	const lab = rgbToLAB(255, 255, 255)
	const rgb = labToRGB(lab.l, lab.a, lab.b)
	assert.equal(rgb.r, 255)
	assert.equal(rgb.g, 255)
	assert.equal(rgb.b, 255)
})

test('lab to rgb - random rgb(120, 136, 198)', () => {
	const lab = rgbToLAB(120, 136, 198)
	const rgb = labToRGB(lab.l, lab.a, lab.b)
	assert.equal(rgb.r, 120)
	assert.equal(rgb.g, 136)
	assert.equal(rgb.b, 198)
})

test.run()
