/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.(jpg|jpeg|png|gif|webp|svg)$':
      '<rootDir>/__mocks__/image-transformer.ts',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/', // Exclude the node_modules directory
    '/cypress/', // Exclude the cypress directory
    '\\.spec\\.ts$', // Exclude files ending with .spec.ts
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
