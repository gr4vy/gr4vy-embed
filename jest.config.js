module.exports = {
  setupFilesAfterEnv: [`<rootDir>tests/setup.ts`],
  collectCoverageFrom: [`src/**/*.ts`],
  coverageReporters: [`text`, `html`],
}
