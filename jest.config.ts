export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.test\\.ts$', // Cambiar para que reconozca archivos .test.ts
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: './coverage',
    testEnvironment: 'node',
  };