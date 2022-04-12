# tocolor

Tiny color conversion library

## About

A very small library built for general color conversion. It does one thing and does it properly.

## Features

- 🤏 Tiny (623B brotli, 703B gzip)
- 🌳 Tree shakable
- 🌟 ESM Support
- 🦍 backed by tests

## Installation

```sh
  npm install @barelyhuman/tocolor
  #or
  yarn add @barelyhuman/tocolor
```

## Usage

```js
import {hexToHSL, hslToHex} from '@barelyhuman/tocolor'

function darker(percentage, hex) {
	if (!percentage) {
		return this
	}
	const {h, s, l} = hexToHSL(hex)
	const _afterDarken = l - percentage
	const value = hslToHex(h, s, _afterDarken)
	return value
}
```

## API Reference

```tsx
type RGBEnum = {
	r: number
	g: number
	b: number
}

type HSLEnum = {
	h: number
	s: number
	l: number
}

/**
 * @name rgbToHex
 * @description converts the given r,g,b numeric values it's 6 digit hex equivalent
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @example
 * rgbToHex(255,255,255) //=> ffffff
 * @returns {string}
 */
export declare function rgbToHex(r: number, g: number, b: number): string

/**
 * @name hslToHex
 * @description converts the given h,s,l numeric values it's hex string equivalent
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @example
 * hslToHex(0,0,100) //=> ffffff
 * @returns {string}
 */
export declare function hslToHex(h: number, s: number, l: number): string

/**
 * @name hslToRGB
 * @description converts the given h,s,l numeric values it's RGB equivalent
 * @param {number} h
 * @param {number} s
 * @param {number} l
 * @example
 * hslToRGB(0,0,100) //=> {r:255,g:255,b:255}
 * @returns @type {RGBEnum}
 */
export declare function hslToRGB(h: number, s: number, l: number): RGBEnum

/**
 * @name rgbToHSL
 * @description converts the given r,g,b numeric values it's HSL equivalent
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @example
 * rgbToHSL(255,255,255) //=> {h:0,s:0,l:100}
 * @returns @type {HSLEnum}
 */
export declare function rgbToHSL(r: number, g: number, b: number): HSLEnum

/**
 * @name hexToRGB
 * @description converts the given hex string to it's RGB equivalent
 * @param {string} hex
 * @example
 * hexToRGB("#fff") //=> {r:255,g:255,b:255}
 * @returns @type {RGBEnum}
 */
export declare function hexToRGB(hex: string): RGBEnum

/**
 * @name hexToHSL
 * @description converts the given hex string to it's HSL equivalent
 * @param {string} hex
 * @example
 * hexToHSL("#fff") //=> {h:0,s:0,l:100}
 * @returns @type {HSLEnum}
 */
export declare function hexToHSL(hex: string): HSLEnum

/**
 * @name parseToHex
 * @description parses the given colorstring to hex, accepts the following formats
 * - rgb (doesn't work with alpha additions, aka no rgba)
 * - hsl
 * @param {string} colorstring any of the formats mentioned in the examples
 * @example
 * parseToHex("rgb(255,255,255)") //=> ffffff
 * parseToHex("hsl(0, 0%, 100%)") //=> ffffff
 * parseToHex("#fff") //=> ffffff
 * @returns {string} 6 digit color hex
 */
export declare function parseToHex(colorstring: string): string
```

## Contributing

Contributions are always welcome!

Follow the general github flow of Fork => PR, make sure that you let the authors know about the issue you pick to avoid overlaps.

## Authors

- [@barelyhuman](https://www.github.com/barelyhuman)

## Support

For support, email <ahoy@barelyhuman.dev>

## License

[MIT](/license)
