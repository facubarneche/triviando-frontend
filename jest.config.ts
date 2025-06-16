import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/src/pages/', '<rootDir>/src/layout/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/utils/*.ts',
    '!src/**/layout.tsx',
    '!src/**/page.tsx',
    '!src/**/mocks.ts',
    '!src/**/types.ts',
    '!src/**/constants.ts',
    '!src/**/*Skeleton.{ts,tsx}',
    '!src/**/*.config*.{ts,tsx}',
    '!src/**/env.ts',
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/src/app/tests/jest.setup.ts'],
};

export default createJestConfig(customJestConfig);
