import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

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
		},
	},
	define: {
		'import.meta.vitest': 'undefined',
	},
});
