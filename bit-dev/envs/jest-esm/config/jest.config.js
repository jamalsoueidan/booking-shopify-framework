const { esmConfig } = require("@teambit/react.jest.react-jest");

module.exports = {
  ...esmConfig,
  transformIgnorePatterns: [
    "^.+.module.(css|sass|scss)$",
    generateNodeModulesPattern({
      packages: packagesToExclude,
      excludeComponents: true,
    }),
  ],
};

const packagesToExclude = ["@teambit"];

function generateNodeModulesPattern({ packages = [], excludeComponents }) {
  const negativeLookaheadPatterns = packages.reduce((acc, curr) => {
    const yarnPattern = curr;
    const pnpmCurr = curr.replace(/\//g, "\\+");
    const pnpmPattern = `\\.pnpm/(.*[+/])?${pnpmCurr}.*`;
    return [...acc, yarnPattern, pnpmPattern];
  }, []);
  if (excludeComponents) {
    negativeLookaheadPatterns.push(
      "@[^/]+/([^/]+\\.)+[^/]+",
      "\\.pnpm/(.+[+/])?@[^+]+\\+([^+]+\\.)+[^+]+",
      "\\.pnpm/.+/node_modules/@[^/]+/([^/]+\\.)+[^/]+",
    );
  }
  const transformIgnorePattern = `node_modules/(?!(${negativeLookaheadPatterns.join(
    "|",
  )})/)`;
  return transformIgnorePattern;
}
