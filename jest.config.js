module.exports = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text', 'html'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
}
