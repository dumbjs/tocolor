import {normalizeHex} from './lib/color'
import {matrix3x3x1Multiplication} from './lib/math'

const padHex = d => (parseInt(d, 16) < 16 ? `0${d}` : d)
const toRGBIndex = (val, lMultiplier) => Math.ceil((val + lMultiplier) * 255)

const CIEEpsilon = 216 / 24389
const CIEKappa = 24389 / 27
const CIEDelta = 6 / 29

/*
	 the standard SRGB' to CIE-XYZ is represented here as an array of
	 rows of each matrix and not columns, so the further calculations
	 are done keeping that in mind
	 */
const transformerMatrix = [
	[0.4124108464885388, 0.3575845678529519, 0.18045380393360833],
	[0.21264934272065283, 0.7151691357059038, 0.07218152157344333],
	[0.019331758429150258, 0.11919485595098397, 0.9503900340503373],
]

/*
	Statically calculate the inverse instead of dynamically doing it 
	since the chances of this changing is close to none as the entire 
	library works on the d65 angle for color positioning
*/
const transformerMatrixInverse = [
	[3.240812398895283, -1.5373084456298136, -0.4985865229069666],
	[-0.9692430170086407, 1.8759663029085742, 0.04155503085668564],
	[0.055638398436112804, -0.20400746093241362, 1.0571295702861434],
]

// minfiable aliases for reused functions
const toInt = (x: string) => parseInt(x, 10)
const floor = Math.floor

interface XYZ {
	x: number
	y: number
	z: number
}

interface LAB {
	l: number
	a: number
	b: number
}

interface RGB {
	r: number
	g: number
	b: number
}

interface HSL {
	h: number
	s: number
	l: number
}

export function rgbToHex(r: number, g: number, b: number) {
	const red = padHex(r.toString(16))
	const green = padHex(g.toString(16))
	const blue = padHex(b.toString(16))
	return normalizeHex(`${red}${green}${blue}`)
}

export function hslToHex(h: number, s: number, l: number): string {
	const {r, g, b} = hslToRGB(h, s, l)
	return rgbToHex(r, g, b)
}

export function hslToRGB(h: number, s: number, l: number): RGB {
	const luminanceInBinary = l > 100 ? 1 : l / 100
	const saturationInBinary = s > 100 ? 1 : s / 100
	const chroma = (1 - Math.abs(2 * luminanceInBinary - 1)) * saturationInBinary
	const huePoint = h > 360 ? (h - 360) / 60 : h / 60
	const secondaryChroma = chroma * (1 - Math.abs((huePoint % 2) - 1))
	const lightnessMultiplier = luminanceInBinary - chroma / 2

	let rTemp, gTemp, bTemp

	const _huePointRounded = floor(huePoint)

	switch (true) {
		case _huePointRounded >= 0 && _huePointRounded < 1: {
			rTemp = chroma
			gTemp = secondaryChroma
			bTemp = 0
			break
		}
		case _huePointRounded >= 1 && _huePointRounded < 2: {
			rTemp = secondaryChroma
			gTemp = chroma
			bTemp = 0
			break
		}
		case _huePointRounded >= 2 && _huePointRounded < 3: {
			rTemp = 0
			gTemp = chroma
			bTemp = secondaryChroma
			break
		}
		case _huePointRounded >= 3 && _huePointRounded < 4: {
			rTemp = 0
			gTemp = secondaryChroma
			bTemp = chroma
			break
		}
		case _huePointRounded >= 4 && _huePointRounded < 5: {
			rTemp = secondaryChroma
			gTemp = 0
			bTemp = chroma
			break
		}
		case _huePointRounded >= 5 && _huePointRounded < 6: {
			rTemp = chroma
			gTemp = 0
			bTemp = secondaryChroma
			break
		}
	}

	return {
		r: toRGBIndex(rTemp, lightnessMultiplier),
		g: toRGBIndex(gTemp, lightnessMultiplier),
		b: toRGBIndex(bTemp, lightnessMultiplier),
	}
}

export function rgbToHSL(r: number, g: number, b: number): HSL {
	const pointR = r / 255
	const pointG = g / 255
	const pointB = b / 255
	const chromaMin = Math.min(pointR, pointG, pointB)
	const chromaMax = Math.max(pointR, pointG, pointB)
	const delta = chromaMax - chromaMin
	const luminance = (chromaMax + chromaMin) / 2

	let saturation = 0
	let hue = 0

	if (delta === 0) {
		saturation = 0
	} else {
		saturation = delta / (1 - Math.abs(2 * luminance - 1))
	}

	switch (true) {
		case delta === 0: {
			hue = 0
		}
	}

	if (saturation > 0) {
		switch (chromaMax) {
			case pointR: {
				hue = ((pointG - pointB) % 6) / delta
				break
			}
			case pointG: {
				hue = 2 + (pointB - pointR) / delta
				break
			}
			case pointB: {
				hue = 4 + (pointR - pointG) / delta
				break
			}
		}
	}

	hue = hue * 60

	if (hue < 0) {
		hue += 360
	}

	return {
		h: floor(hue),
		s: floor(saturation * 100),
		l: floor(luminance * 100),
	}
}

export function hexToRGB(hex: string): RGB {
	const colorString = normalizeHex(hex)
	const r = hexToInt(colorString, 0)
	const g = hexToInt(colorString, 2)
	const b = hexToInt(colorString, 4)
	return {r, g, b}
}

/**
 * @description converts a sliced hex into it's integer equivalent
 * ex: (000000,1), would take the 1st to digits 00 as hex and convert to int which
 * is also 0
 * but (FFFFFF,1) would give you FF /=> 255
 */
export function hexToInt(hex: string, index: number): number {
	return parseInt(hex.slice(index, index + 2), 16)
}

export function hexToHSL(hex: string): HSL {
	const {r, g, b} = hexToRGB(hex)
	return rgbToHSL(r, g, b)
}

/**
 * @description parse a given string of value hex / rgb / hsl format
 * into it's normalized hex variant
 */
export function parseToHex(colorstring: string): string {
	const rgbMatcher = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/
	const hslMatcher = /^hsl\(\s*(\d+)\s*,\s*(\d+)%*\s*,\s*(\d+)%*\s*\)$/

	switch (true) {
		case rgbMatcher.test(colorstring): {
			const _values = colorstring.match(rgbMatcher)
			if (_values && _values.length) {
				return rgbToHex(
					parseInt(_values[1], 10),
					parseInt(_values[2], 10),
					parseInt(_values[3], 10),
				)
			} else {
				throw new Error('Invalid RGB String')
			}
		}
		case hslMatcher.test(colorstring): {
			const _values = colorstring.match(hslMatcher)
			if (_values && _values.length) {
				return hslToHex(toInt(_values[1]), toInt(_values[2]), toInt(_values[3]))
			} else {
				throw new Error('Invalid HSL String')
			}
		}
		default: {
			const _value = normalizeHex(colorstring)
			if (_value.length > 6) {
				throw new Error('Invalid Hex String')
			}
			return _value
		}
	}
}

/**
 * Convert a (0-255) Web RGB to XYZ standards
 * @param r 0-255
 * @param g 0-255
 * @param b 0-255
 * @returns
 */
export function rgbToXYZ(r: number, g: number, b: number): XYZ {
	const rgbInBits = {r: r / 255.0, g: g / 255.0, b: b / 255}

	const linearRGB = {
		r: 0,
		g: 0,
		b: 0,
	}

	Object.keys(linearRGB).forEach(k => {
		if (rgbInBits[k] <= 0.04045) {
			linearRGB[k] = rgbInBits[k] / 12.92
		} else {
			linearRGB[k] = Math.pow((rgbInBits[k] + 0.055) / 1.055, 2.4)
		}

		linearRGB[k] = Number(linearRGB[k].toFixed(8))
	})

	const RGBMatrix = [[linearRGB.r], [linearRGB.g], [linearRGB.b]]

	const values = matrix3x3x1Multiplication(transformerMatrix, RGBMatrix)

	let [x, y, z] = values

	return {
		x,
		y,
		z,
	}
}

export function xyzToLAB(x: number, y: number, z: number): LAB {
	const whiteRef = rgbToXYZ(255, 255, 255)

	const xR = x / whiteRef.x
	const yR = y / whiteRef.y
	const zR = z / whiteRef.z

	const computedX = xyzToLabDeltaNormalizer(xR)
	const computedY = xyzToLabDeltaNormalizer(yR)
	const computedZ = xyzToLabDeltaNormalizer(zR)

	return {
		l: 116 * computedY - 16,
		a: 500 * (computedX - computedY),
		b: 200 * (computedY - computedZ),
	}
}

function xyzToLabDeltaNormalizer(colorPoint: number) {
	return colorPoint > CIEEpsilon
		? Math.cbrt(colorPoint)
		: (CIEKappa * colorPoint + 16) / 116
}

export function rgbToLAB(r: number, g: number, b: number): LAB {
	const xyz = rgbToXYZ(r, g, b)
	const lab = xyzToLAB(xyz.x, xyz.y, xyz.z)
	return lab
}

export function labToXYZ(l: number, a: number, b: number): XYZ {
	const whiteRef = rgbToXYZ(255, 255, 255)

	const commonYPoint = (l + 16) / 116
	const xPoint = commonYPoint + a / 500
	const zPoint = commonYPoint - b / 200

	let xR = labToXYZDeltaNormalizer(xPoint)
	let yR = labToXYZDeltaNormalizer(commonYPoint)
	let zR = labToXYZDeltaNormalizer(zPoint)

	return {
		x: xR * whiteRef.x,
		y: yR * whiteRef.y,
		z: zR * whiteRef.z,
	}
}

function labToXYZDeltaNormalizer(colorPoint: number): number {
	if (colorPoint > CIEDelta) {
		return Math.pow(colorPoint, 3)
	}
	return 3 * Math.pow(CIEDelta, 2) * (colorPoint - 4 / 29)
}

export function xyzToRGB(x: number, y: number, z: number): RGB {
	let linearRGB = {}

	// const values = []
	const XYZMatrix = [[x], [y], [z]]

	const values = matrix3x3x1Multiplication(transformerMatrixInverse, XYZMatrix)

	let [r, g, b] = values

	linearRGB = {
		r,
		g,
		b,
	}

	const RGB = {r: 0, g: 0, b: 0}

	Object.keys(linearRGB).forEach(k => {
		if (linearRGB[k] <= 0.00313066844250060782371) {
			RGB[k] = linearRGB[k] * 12.92
		} else {
			RGB[k] = 1.055 * Math.pow(linearRGB[k], 1 / 2.4) - 0.055
		}

		RGB[k] = Math.round(RGB[k] * 255)
	})

	return RGB
}

export function labToRGB(l: number, a: number, b: number): RGB {
	const xyz = labToXYZ(l, a, b)
	return xyzToRGB(xyz.x, xyz.y, xyz.z)
}
