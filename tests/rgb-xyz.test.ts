import {test} from 'uvu'
import assert from 'uvu/assert'

import {rgbToXYZ} from '../src'

test('d65 white point', () => {
	const xyz = rgbToXYZ(255, 255, 255)
	assert.equal(xyz.x, 0.9505)
	assert.equal(xyz.y, 1.0)
	assert.equal(xyz.z, 1.0888)
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
	assert.equal(xyz.x, 0.8599)
	assert.equal(xyz.y, 0.9047)
	assert.equal(xyz.z, 0.985)
})

test('rgb to xyz - random rgb(120, 136, 198)', () => {
	const xyz = rgbToXYZ(120, 136, 198)
	assert.equal(xyz.x, 0.2674)
	assert.equal(xyz.y, 0.2568)
	assert.equal(xyz.z, 0.5696)
})

test.run()
