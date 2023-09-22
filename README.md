![tocolor](https://socialify.git.ci/barelyhuman/tocolor/image?description=1&name=1&owner=1&pattern=Solid&theme=Dark)

## Highlights

- 🌳 Tree shakable
- 🌟 ESM Support
- 🦍 backed by tests
- Supports conversions among RGB, HSL, L\*a\*b\*, HEX, XYZ

> **Note**: When dealing with XYZ and L\*a\*b\*, the library uses the reference white point based on D65 and doesn't support changing the white point, right now

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
