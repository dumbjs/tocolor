const {defineConfig} = require('tsup')

module.exports = defineConfig({
	entry: ['./src/index.ts'],
	bundle: true,
	dts: true,
	format: ['esm', 'cjs'],
	outDir: './dist',
	target: 'node14',
})
