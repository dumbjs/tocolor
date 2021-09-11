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
import { hexToHSL, hslToHex } from "@barelyhuman/tocolor";

function darker(percentage, hex) {
  if (!percentage) {
    return this;
  }
  const { h, s, l } = hexToHSL(hex);
  const _afterDarken = l - percentage;
  const value = hslToHex(h, s, _afterDarken);
  return value;
}
```

## API Reference

Exports the following

```tsx
rgbToHex(r: number, g: number, b: number): string;

hslToHex(h: number, s: number, l: number): string;

hslToRGB(h: number, s: number, l: number): {
  r: number;
  g: number;
  b: number;
};

rgbToHSL(r: number, g: number, b: number): {
  h: number;
  s: number;
  l: number;
};

hexToRGB(hex: string): {
  r: number;
  g: number;
  b: number;
};

hexToHSL(hex: string): {
  h: number;
  s: number;
  l: number;
};

```

## Contributing

Contributions are always welcome!

Follow the general github flow of Fork => PR, make sure that you let the authors know about the issue you pick to avoid overlaps.

## Authors

- [@barelyhuman](https://www.github.com/barelyhuman)

## Support

For support, email <ahoy@barelyhuman.dev>

## License

[MIT](https://choosealicense.com/licenses/mit/)
