module.exports = {
    testEnvironment: 'node', 
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.js$',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };
  