/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    clearMocks: true,
    verbose: true,
    maxWorkers: 1,


    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
    },


    globalTeardown: '<rootDir>/tests/globalTeardown.ts',
};
