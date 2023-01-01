import {test} from 'uvu'
import assert from 'uvu/assert'

import {labToXYZ, rgbToLAB, rgbToXYZ, xyzToLAB} from '../src'

test('xyz to lab - base 0,0,0', () => {
	const lab = xyzToLAB(0, 0, 0)
	assert.equal(lab.l, 0)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('xyz to lab - edge 255,255,255', () => {
	const xyz = rgbToXYZ(255, 255, 255)
	const lab = xyzToLAB(xyz.x, xyz.y, xyz.z)
	assert.equal(lab.l, 100)
	assert.equal(lab.a, 0)
	assert.equal(lab.b, 0)
})

test('xyz to lab - random rgb(120, 136, 198)', () => {
	const xyz = rgbToXYZ(120, 136, 198)
	const lab = xyzToLAB(xyz.x, xyz.y, xyz.z)
	assert.equal(Number(lab.l.toFixed(4)), 57.7321)
	assert.equal(Number(lab.a.toFixed(4)), 9.8229)
	assert.equal(Number(lab.b.toFixed(4)), -34.0329)
})

test('lab to xyz - base 0,0,0', () => {
	const xyz = labToXYZ(0, 0, 0)
	assert.equal(xyz.x, 0)
	assert.equal(xyz.y, 0)
	assert.equal(xyz.z, 0)
})

test('lab to xyz - edge 255,255,255', () => {
	const lab = rgbToLAB(255, 255, 255)
	const xyz = labToXYZ(lab.l, lab.a, lab.b)
	assert.equal(xyz.x, 0.9504)
	assert.equal(xyz.y, 1)
	assert.equal(xyz.z, 1.0889)
})

test('lab to xyz - random rgb(120, 136, 198)', () => {
	const lab = rgbToLAB(120, 136, 198)
	const xyz = labToXYZ(lab.l, lab.a, lab.b)

	assert.equal(Number(xyz.x.toFixed(4)), 0.2674)
	assert.equal(Number(xyz.y.toFixed(4)), 0.2568)
	assert.equal(Number(xyz.z.toFixed(4)), 0.5697)
})

test.run()
