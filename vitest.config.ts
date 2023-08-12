import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, 'packages/template/*'],
		coverage: {
			lines: 80,
			statements: 80,
			functions: 80,
			branches: 80,
			reporter: ['lcov', 'text', 'html'],
			skipFull: true,
			all: true,
			exclude: ['**/*.test.*', '**/*.js']
		}
	}
})
