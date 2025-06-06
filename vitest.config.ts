import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const _filePath = fileURLToPath(import.meta.url);
const __dirname = path.dirname(_filePath);

export default defineConfig({
	test: {
		globals: true,
		include: ['./src/**/*.test.{js,ts}', './tests/**/*.test.{js,ts}'],
	},
	resolve: {
		alias: {
			'@helpers': path.resolve(__dirname, './src/utils/helpers'),
			'@enums': path.resolve(__dirname, './src/enums'),
			'@zTypes': path.resolve(__dirname, './src/types'),
			'@src': path.resolve(__dirname, './src'),
		},
	},
	define: {
		'import.meta.vitest': 'undefined',
	},
});
