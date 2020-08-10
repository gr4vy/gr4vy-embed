module.exports = {
  "setupFilesAfterEnv": [`<rootDir>tests/setup.js`],
  "collectCoverageFrom": [
    `src/**/*.js`
  ],
  "coverageReporters": [
    `text`,
    `html`
  ]
}
