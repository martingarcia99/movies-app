module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '\\.(css|scss)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transformIgnorePatterns: [
        'node_modules/(?!(module-to-transform|another-module)/)',
    ],
  };  