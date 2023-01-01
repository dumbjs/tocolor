import {test} from 'uvu'
import assert from 'uvu/assert'

import {rgbToXYZ, xyzToRGB} from '../src'

test('d65 white point', () => {
	const xyz = rgbToXYZ(255, 255, 255)
	assert.equal(xyz.x, 0.9504)
	assert.equal(xyz.y, 1.0)
	assert.equal(xyz.z, 1.0889)
})

test('rgb to xyz - base 0,0,0', () => {
	const xyz = rgbToXYZ(0, 0, 0)
	assert.equal(xyz.x, 0)
	assert.equal(xyz.y, 0)
	assert.equal(xyz.z, 0)
})

test('rgb to xyz - base 1,1,1', () => {
	const xyz = rgbToXYZ(1, 1, 1)
	assert.equal(xyz.x, 0.0003)
	assert.equal(xyz.y, 0.0003)
	assert.equal(xyz.z, 0.0003)
})

test('rgb to xyz - edge 244,244,244', () => {
	const xyz = rgbToXYZ(244, 244, 244)
	assert.equal(xyz.x, 0.8598)
	assert.equal(xyz.y, 0.9047)
	assert.equal(xyz.z, 0.9851)
})

test('rgb to xyz - random rgb(120, 136, 198)', () => {
	const xyz = rgbToXYZ(120, 136, 198)
	assert.equal(xyz.x, 0.2674)
	assert.equal(xyz.y, 0.2568)
	assert.equal(xyz.z, 0.5697)
})

test('xyz to rgb - rgb(255,255,255)', () => {
	const xyz = rgbToXYZ(255, 255, 255)
	const rgb = xyzToRGB(xyz.x, xyz.y, xyz.z)

	assert.equal(rgb.r, 255)
	assert.equal(rgb.g, 255)
	assert.equal(rgb.b, 255)
})

test('xyz to rgb - rgb(0,0,0)', () => {
	const xyz = rgbToXYZ(0, 0, 0)
	const rgb = xyzToRGB(xyz.x, xyz.y, xyz.z)

	assert.equal(rgb.r, 0)
	assert.equal(rgb.g, 0)
	assert.equal(rgb.b, 0)
})

test('xyz to rgb - rgb(244,244,244)', () => {
	const xyz = rgbToXYZ(244, 244, 244)
	const rgb = xyzToRGB(xyz.x, xyz.y, xyz.z)

	assert.equal(rgb.r, 244)
	assert.equal(rgb.g, 244)
	assert.equal(rgb.b, 244)
})

test('xyz to rgb - random rgb(120, 136, 198)', () => {
	const xyz = rgbToXYZ(120, 136, 198)
	const rgb = xyzToRGB(xyz.x, xyz.y, xyz.z)
	assert.equal(rgb.r, 120)
	assert.equal(rgb.g, 136)
	assert.equal(rgb.b, 198)
})

test.run()
