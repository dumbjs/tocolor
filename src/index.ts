import {max, min, normalizeHex} from './lib/utils'

const padHex = d => (parseInt(d, 16) < 16 ? `0${d}` : d)
const toRGBIndex = (val, lMultiplier) => Math.ceil((val + lMultiplier) * 255)

// minfiable aliases for reused functions
const toInt = (x: string) => parseInt(x, 10)
const floor = Math.floor

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
	const chromaMin = min(pointR, pointG, pointB)
	const chromaMax = max(pointR, pointG, pointB)
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
