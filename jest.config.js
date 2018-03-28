
module.exports = {
  verbose: true,
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: [
    '<rootDir>/test/setupTest.js',
    '<rootDir>/test/__mocks__/mockLocalStorage.js'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/js/components/Footer',
    '<rootDir>/js/components/Home',
    '<rootDir>/js/components/NavigationBar',
    '<rootDir>/js/components/NotFound',
    '<rootDir>/coverage',
    '<rootDir>/scss',
    '<rootDir>/js/utils',
    '<rootDir>/js/app',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],

};
