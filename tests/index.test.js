const {test} = require('uvu')
const assert = require('uvu/assert')
const {
	hexToRGB,
	hexToHSL,
	hslToHex,
	hslToRGB,
	rgbToHSL,
	rgbToHex,
	parseToHex,
} = require('../src')
const {normalizeHex} = require('../src/lib/utils')

const colors = {
	black3: '#000',
	black6: '#000000',
	white: '#FFFFFF',
	red3: '#F00',
	red6: '#FF0000',
	lime: '#00FF00',
	blue: '#0000FF',
	yellow: '#FFFF00',
	cyan: '#00FFFF',
	magenta: '#FF00FF',
	silver: '#C0C0C0',
	gray: '#808080',
	maroon: '#800000',
	olive: '#808000',
	green: '#008000',
	purple: '#800080',
	teal: '#008080',
	navy: '#000080',
}

const MATCH_MAPPERS = {
	black3: {
		hex: '#000000',
		rgb: {r: 0, g: 0, b: 0},
		hsl: {h: 0, s: 0, l: 0},
	},
	black6: {
		hex: '#000000',
		rgb: {r: 0, g: 0, b: 0},
		hsl: {h: 0, s: 0, l: 0},
	},
	white: {
		hex: '#FFFFFF',
		rgb: {r: 255, g: 255, b: 255},
		hsl: {h: 0, s: 0, l: 100},
	},
	red3: {
		hex: '#FF0000',
		rgb: {r: 255, g: 0, b: 0},
		hsl: {h: 0, s: 100, l: 50},
	},
	red6: {
		hex: '#FF0000',
		rgb: {r: 255, g: 0, b: 0},
		hsl: {h: 0, s: 100, l: 50},
	},
	lime: {
		hex: '#00FF00',
		rgb: {r: 0, g: 255, b: 0},
		hsl: {h: 120, s: 100, l: 50},
	},
	blue: {
		hex: '#0000FF',
		rgb: {r: 0, g: 0, b: 255},
		hsl: {h: 240, s: 100, l: 50},
	},
	yellow: {
		hex: '#FFFF00',
		rgb: {r: 255, g: 255, b: 0},
		hsl: {h: 60, s: 100, l: 50},
	},
	cyan: {
		hex: '#00FFFF',
		rgb: {r: 0, g: 255, b: 255},
		hsl: {h: 180, s: 100, l: 50},
	},
	magenta: {
		hex: '#FF00FF',
		rgb: {r: 255, g: 0, b: 255},
		hsl: {h: 300, s: 100, l: 50},
	},
	silver: {
		hex: '#C0C0C0',
		rgb: {r: 192, g: 192, b: 192},
		hsl: {h: 0, s: 0, l: 75},
	},
	gray: {
		hex: '#808080',
		rgb: {r: 128, g: 128, b: 128},
		hsl: {h: 0, s: 0, l: 50},
	},
	maroon: {
		hex: '#800000',
		rgb: {r: 128, g: 0, b: 0},
		hsl: {h: 0, s: 100, l: 25},
	},
	olive: {
		hex: '#808000',
		rgb: {r: 128, g: 128, b: 0},
		hsl: {h: 60, s: 100, l: 25},
	},
	green: {
		hex: '#008000',
		rgb: {r: 0, g: 128, b: 0},
		hsl: {h: 120, s: 100, l: 25},
	},
	purple: {
		hex: '#800080',
		rgb: {r: 128, g: 0, b: 128},
		hsl: {h: 300, s: 100, l: 25},
	},
	teal: {
		hex: '#008080',
		rgb: {r: 0, g: 128, b: 128},
		hsl: {h: 180, s: 100, l: 25},
	},
	navy: {
		hex: '#000080',
		rgb: {r: 0, g: 0, b: 128},
		hsl: {h: 240, s: 100, l: 25},
	},
}

test('hex to rgb', () => {
	Object.keys(colors).forEach(color => {
		const convertedColor = hexToRGB(colors[color])
		const ref = MATCH_MAPPERS[color].rgb
		assert.equal(convertedColor.r, ref.r)
		assert.equal(convertedColor.g, ref.g)
		assert.equal(convertedColor.b, ref.b)
	})
})

test('hex to hsl', () => {
	Object.keys(colors).forEach(color => {
		const convertedColor = hexToHSL(colors[color])
		const ref = MATCH_MAPPERS[color].hsl
		assert.equal(convertedColor.h, ref.h)
		assert.equal(convertedColor.s, ref.s)
		assert.equal(convertedColor.l, ref.l)
	})
})

test('hsl to rgb', () => {
	Object.keys(colors).forEach(color => {
		const {h, s, l} = MATCH_MAPPERS[color].hsl
		const convertedColor = hslToRGB(h, s, l)
		const ref = MATCH_MAPPERS[color].rgb

		assert.equal(ref.r, convertedColor.r)
		assert.equal(ref.g, convertedColor.g)
		assert.equal(ref.b, convertedColor.b)
	})
})

test('hsl to hex', () => {
	Object.keys(colors).forEach(color => {
		const {h, s, l} = MATCH_MAPPERS[color].hsl
		const convertedColor = hslToHex(h, s, l)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('rgb to hex', () => {
	Object.keys(colors).forEach(color => {
		const {r, g, b} = MATCH_MAPPERS[color].rgb
		const convertedColor = rgbToHex(r, g, b)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('rgb to hsl', () => {
	Object.keys(colors).forEach(color => {
		const {r, g, b} = MATCH_MAPPERS[color].rgb
		const convertedColor = rgbToHSL(r, g, b)
		const ref = MATCH_MAPPERS[color].hsl
		assert.equal(convertedColor.h, ref.h)
		assert.equal(convertedColor.s, ref.s)
		assert.equal(convertedColor.l, ref.l)
	})
})

test('parse to hex - rgb', () => {
	Object.keys(colors).forEach(color => {
		const {r, g, b} = MATCH_MAPPERS[color].rgb
		const rgbString = `rgb(${r}, ${g}, ${b})`
		const convertedColor = parseToHex(rgbString)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('parse to hex - hsl', () => {
	Object.keys(colors).forEach(color => {
		const {h, s, l} = MATCH_MAPPERS[color].hsl
		const hslString = `hsl(${h}, ${s}, ${l})`
		const convertedColor = parseToHex(hslString)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('parse to hex - hsl with percentage', () => {
	Object.keys(colors).forEach(color => {
		const {h, s, l} = MATCH_MAPPERS[color].hsl
		const hslString = `hsl(${h}, ${s}%, ${l}%)`
		const convertedColor = parseToHex(hslString)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('parse to hex - hex', () => {
	Object.keys(colors).forEach(color => {
		const hexString = MATCH_MAPPERS[color].hex
		const convertedColor = parseToHex(hexString)
		const ref = MATCH_MAPPERS[color].hex
		assert.equal(normalizeHex(ref), normalizeHex(convertedColor))
	})
})

test('parse to hex - invalid string', () => {
	try {
		const hexString = '123kjb2b1k1'
		parseToHex(hexString)
	} catch (err) {
		assert.equal(err.message, 'Invalid Hex String')
	}
})

test.run()
