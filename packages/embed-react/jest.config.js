// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../jest.config.js')

module.exports = {
  ...config,
  setupFilesAfterEnv: [`./jest.setup.ts`],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx'],
}
