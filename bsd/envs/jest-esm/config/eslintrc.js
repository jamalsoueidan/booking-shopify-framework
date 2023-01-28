// force bit to recgonize this as dependency
require("@teambit/react.eslint-config-bit-react");

const ext = require.resolve("@teambit/react.eslint-config-bit-react");

module.exports = {
  extends: [
    ext,
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "eslint-config-prettier",
  ],
  rules: {
    "react/display-name": "off",
    "import/no-unresolved": "off",
    "import/named": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/accessible-emoji": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
  parserOptions: {
    createDefaultProgram: true,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
};
