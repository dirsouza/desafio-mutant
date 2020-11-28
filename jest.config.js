module.exports = {
  clearMocks: true,
  rootDir: './src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    'App/(.*)$': '<rootDir>/app/$1',
    'Domain/(.*)$': '<rootDir>/domain/$1',
    'Infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!<rootDir>/main.(t|j)s',
    '!<rootDir>/domain/dtos/**/*.(t|j)s',
    '!<rootDir>/domain/entities/**/*.(t|j)s',
    '!<rootDir>/infrastructure/**/*.(t|j)s',
  ],
  coverageDirectory: './coverage',
}
