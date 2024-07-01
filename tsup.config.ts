import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'], // Build for commonJS and ESmodules
	dts: true, // Generate declaration file (.d.ts)
	splitting: true,
	sourcemap: false,
	clean: true,
	ignoreWatch: ['node_modules', '.history', '*ignore*', '.vscode', '.git'],
	minify: true,
	outDir: './dist',
	tsconfig: './tsconfig.json',
	treeshake: 'recommended',
  target: "es2015",
  keepNames: false
});
