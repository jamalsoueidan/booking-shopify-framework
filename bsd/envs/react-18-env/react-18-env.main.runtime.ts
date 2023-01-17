import { MainRuntime } from "@teambit/cli";
import { ReactAspect, ReactMain } from "@teambit/react";
import { EnvsAspect, EnvsMain } from "@teambit/envs";
import { React18EnvAspect } from "./react-18-env.aspect";
// import { previewConfigTransformer, devServerConfigTransformer } from './webpack/webpack-transformers';
// import { previewConfigTransformer, devServerConfigTransformer } from '@bit-foundations/env-configs.webpack.webpack-analyzer';

/**
 * Uncomment to include config files for overrides of Typescript or Webpack
 */
// const tsconfig = require('./typescript/tsconfig');

export class React18EnvMain {
  static slots = [];

  static dependencies = [ReactAspect, EnvsAspect];

  static runtime = MainRuntime;

  static async provider([react, envs]: [ReactMain, EnvsMain]) {
    const templatesReactEnv = envs.compose(react.reactEnv, [
      /**
       * Uncomment to override the config files for TypeScript, Webpack or Jest
       * Your config gets merged with the defaults
       */

      // react.overrideTsConfig(tsconfig),
      // react.useWebpack({
      //   previewConfig: [previewConfigTransformer],
      //   devServerConfig: [devServerConfigTransformer],
      // }),
      // react.overrideJestConfig(require.resolve('./jest/jest.config')),
      react.overrideDocsTemplate(require.resolve("./docs/docs")),
      // react.overrideJestConfig(require.resolve("./jest/jest.config")),
      react.overrideMounter(require.resolve("./mounter/mounter")),
      /**
       * override the ESLint default config here then check your files for lint errors
       * @example
       * bit lint
       * bit lint --fix
       */
      // react.useEslint({
      //   transformers: [
      //     (config) => {
      //       config.setRule('no-console', ['error']);
      //       return config;
      //     }
      //   ]
      // }),

      /**
       * override the Prettier default config here the check your formatting
       * @example
       * bit format --check
       * bit format
       */
      // react.usePrettier({
      //   transformers: [
      //     (config) => {
      //       config.setKey('tabWidth', 2);
      //       return config;
      //     }
      //   ]
      // }),

      /**
       * override dependencies here
       */
      react.overrideDependencies({
        devDependencies: {
          "@types/react": "^18.0.17",
          "@types/react-dom": "^18.0.6",
        },
        peers: [
          {
            name: "react",
            version: "18.2.0",
            supportedRange: "^18.2.0",
          },
          {
            name: "react-dom",
            version: "18.2.0",
            supportedRange: "^18.2.0",
          },
          {
            name: "@testing-library/react",
            version: "13.4.0",
            supportedRange: "^13.4.0",
          },
          {
            name: "@testing-library/react-hooks",
            version: "8.0.1",
            supportedRange: "^8.0.1",
          },
          {
            name: "@shopify/polaris",
            version: "10.19.0",
            supportedRange: "^10.19.0",
          },
          {
            name: "@shopify/polaris-icons",
            version: "6.7.0",
            supportedRange: "^6.7.0",
          },
          {
            name: "@shopify/react-form",
            version: "2.5.0",
            supportedRange: "^2.5.0",
          },
          {
            name: "@shopify/react-i18n",
            version: "7.5.1",
            supportedRange: "^7.5.1",
          },
        ],
        /**
         * dev dependencies resolved in the workspace
         * for components using this env. these dependencies would not be defined
         * as a direct component dependencies. they are used for component development only.
         **/
        dev: [
          {
            name: "@types/react",
            version: "^18.0.17",
            hidden: true,
            force: true,
          },
          {
            name: "@types/react-dom",
            version: "^18.0.6",
            hidden: true,
            force: true,
          },
          {
            name: "@types/jest",
            version: "^29.2.2",
            hidden: true,
            force: true,
          },
          {
            name: "@types/node",
            version: "^12.20.4",
            hidden: true,
            force: true,
          },
          {
            name: "@testing-library/react",
            version: "^13.4.0",
            hidden: true,
            force: true,
          },
          {
            name: "@types/testing-library__jest-dom",
            version: "^5.9.5",
            hidden: true,
            force: true,
          },
          {
            name: "@babel/runtime",
            version: "^7.20.0",
            hidden: true,
            force: true,
          },
        ],
      }),
    ]);
    envs.registerEnv(templatesReactEnv);
    return new React18EnvMain();
  }
}

React18EnvAspect.addRuntime(React18EnvMain);
