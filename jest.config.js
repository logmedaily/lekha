module.exports = {
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: 'v8',

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'json'],

    // The test environment that will be used for testing
    testEnvironment: 'node',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[tj]s?(x)'
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '/node_modules/'
    ],

    // Whether to use watchman for file crawling
    watchman: false,
};
