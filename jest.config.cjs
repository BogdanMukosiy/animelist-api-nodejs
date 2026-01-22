/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js', 'json'],
    clearMocks: true,
    verbose: true,
    maxWorkers: 1,

    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
    },
};
