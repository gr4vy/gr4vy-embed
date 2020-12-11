module.exports = {
  setupFilesAfterEnv: [`<rootDir>tests/setup.ts`],
  collectCoverageFrom: [`src/**/*.ts`],
  coverageReporters: [`text`, `html`],
  coveragePathIgnorePatterns: [`src/dev/*`],
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': `<rootDir>/node_modules/jest-css-modules`,
    '\\.(svg)$': `<rootDir>/tests/__mocks__/fileMock.ts`,
  },
}
