type RGBEnum = {
  r: number;
  g: number;
  b: number;
};

type HSLEnum = {
  h: number;
  s: number;
  l: number;
};

export declare function rgbToHex(r: number, g: number, b: number): string;
export declare function hslToHex(h: number, s: number, l: number): string;
export declare function hslToRGB(h: number, s: number, l: number): RGBEnum
export declare function rgbToHSL(r: number, g: number, b: number): HSLEnum
export declare function hexToRGB(hex: string): RGBEnum
export declare function hexToHSL(hex: string): HSLEnum