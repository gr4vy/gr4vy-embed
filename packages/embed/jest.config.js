// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../jest.config.js')

module.exports = {
  ...config,
  setupFilesAfterEnv: [`./jest.setup.js`],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.ts',
    'src/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
}
