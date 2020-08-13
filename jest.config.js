module.exports = {
  "setupFilesAfterEnv": [`<rootDir>tests/setup.js`],
  "collectCoverageFrom": [
    `src/**/*.js`
  ],
  "coverageReporters": [
    `text`,
    `html`
  ],
  "coveragePathIgnorePatterns": [
    `src/public`
  ],
  "moduleNameMapper": {
    "\\.(css|less|scss|sss|styl)$": `<rootDir>/node_modules/jest-css-modules`,
    "\\.(svg)$": `<rootDir>/tests/__mocks__/fileMock.js`
  }
}
