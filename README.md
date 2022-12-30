<p align="center">
  <img src="images/tocolor.png" height="64">
<p align="center">Tiny color conversion library</p>

## About

A very small library built for general color conversion. It only tries to do one thing and do it properly.

## Highlights

- 🌳 Tree shakable
- 🌟 ESM Support
- 🦍 backed by tests
- Supports conversions between RGB, HSL, LAB, HEX, XYZ, LAB

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

[API](https://typeapi.barelyhuman.dev/package/@barelyhuman/tocolor@next)

## Contributing

Contributions are always welcome!

Follow the general github flow of Fork => PR, make sure that you let the authors know about the issue you pick to avoid overlaps.

## Authors

- [@barelyhuman](https://www.github.com/barelyhuman)

## Support

For support, email <ahoy@barelyhuman.dev>

## License

[MIT](/license)
