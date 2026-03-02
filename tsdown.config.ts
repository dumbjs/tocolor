import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  unbundle: true,
  dts: true,
  format: ['esm', 'cjs'],
  outDir: './dist',
  target: 'node14',
})
