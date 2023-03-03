// Override the Jest config to ignore transpiling from specific folders
// See the base Jest config: https://bit.cloud/teambit/react/react/~code/jest/jest.config.js

const {cjsConfig} = require('@teambit/react.jest.react-jest');
// const {esmConfig} = require('@teambit/react.jest.react-jest');
// uncomment the line below and install the package if you want to use this function
const {
  generateNodeModulesPattern,
} = require('@teambit/dependencies.modules.packages-excluder');
const packagesToExclude = ['@teambit'];

module.exports = {
  ...cjsConfig,
  // ...esmConfig,
  transformIgnorePatterns: [
    '^.+\.module\.(css|sass|scss)$',
    generateNodeModulesPattern({ packages: packagesToExclude, excludeComponents: true }),
  ],
};
