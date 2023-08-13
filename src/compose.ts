import type {HSL, LAB, RGB, XYZ} from './index'

import {
	hexToHSL as nFP_hexToHSL,
	hexToRGB as nFP_hexToRGB,
	hslToHex as nFP_hslToHex,
	hslToRGB as nFP_hslToRGB,
	labToRGB as nFP_labToRGB,
	labToXYZ as nFP_labToXYZ,
	rgbToHSL as nFP_rgbToHSL,
	rgbToHex as nFP_rgbToHex,
	rgbToLAB as nFP_rgbToLAB,
	rgbToXYZ as nFP_rgbToXYZ,
	xyzToLAB as nFP_xyzToLAB,
	xyzToRGB as nFP_xyzToRGB,
} from './index'

export function rgbToHex(o: RGB) {
	return nFP_rgbToHex(o.r, o.g, o.b)
}
export function hslToHex(o: HSL) {
	return nFP_hslToHex(o.h, o.s, o.l)
}
export function hslToRGB(o: HSL) {
	return nFP_hslToRGB(o.h, o.s, o.l)
}

export function rgbToHSL(o: RGB) {
	return nFP_rgbToHSL(o.r, o.g, o.b)
}
export function hexToRGB(o: string) {
	return nFP_hexToRGB(o)
}

export function hexToHSL(o: string) {
	return nFP_hexToHSL(o)
}

export function rgbToXYZ(o: RGB) {
	return nFP_rgbToXYZ(o.r, o.g, o.b)
}

export function xyzToLAB(o: XYZ) {
	return nFP_xyzToLAB(o.x, o.y, o.z)
}

export function rgbToLAB(o: RGB) {
	return nFP_rgbToLAB(o.r, o.g, o.b)
}

export function labToXYZ(o: LAB) {
	return nFP_labToXYZ(o.l, o.a, o.b)
}

export function xyzToRGB(o: XYZ) {
	return nFP_xyzToRGB(o.x, o.y, o.z)
}

export function labToRGB(o: LAB) {
	return nFP_labToRGB(o.l, o.a, o.b)
}
