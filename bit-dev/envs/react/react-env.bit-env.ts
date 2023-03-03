import { Compiler } from "@teambit/compiler";
import { ESLintLinter, EslintTask } from "@teambit/defender.eslint-linter";
import { EnvHandler } from "@teambit/envs";
import { StarterList, TemplateList } from "@teambit/generator";
import { ReactPreview } from "@teambit/preview.react-preview";
import { ReactAppType } from "@teambit/react.apps.react-app-types";
import { ReactWorkspaceStarter } from "@teambit/react.generator.react-starters";
import {
  ReactAppTemplate,
  ReactComponentTemplate,
  ReactContextTemplate,
  ReactEnvTemplate,
  ReactHookTemplate,
  ReactJSComponentTemplate,
} from "@teambit/react.generator.react-templates";
import { TypeScriptExtractor } from "@teambit/typescript";
import {
  TypescriptCompiler,
  // resolveTypes,
  TypescriptTask,
  resolveTypes,
} from "@teambit/typescript.typescript-compiler";

import { AppTypeList } from "@teambit/application";
import { CAPSULE_ARTIFACTS_DIR, Pipeline } from "@teambit/builder";
import { JestTask, JestTester } from "@teambit/defender.jest-tester";
import { PrettierFormatter } from "@teambit/defender.prettier-formatter";
import { PackageGenerator } from "@teambit/pkg";
import { Preview } from "@teambit/preview";
import { SchemaExtractor } from "@teambit/schema";
import { Tester } from "@teambit/tester";
import { ESLint as ESLintLib } from "eslint";
import typescript from "typescript";
import { ReactEnvInterface } from "./react-env-interface";

export class ReactEnv implements ReactEnvInterface {
  [key: string]: unknown;

  /**
   * name of the environment. used for friendly mentions across bit.
   */
  name = "react";

  /**
   * icon for the env. use this to build a more friendly env.
   * uses react by default.
   */
  icon = "https://static.bit.dev/extensions-icons/react.svg";

  /**
   * Default npm ignore paths.
   * Will ignore the "artifacts" directory by default.
   */
  npmIgnore = [`${CAPSULE_ARTIFACTS_DIR}/`];

  /**
   * Default host dependencies for the react preview.
   */
  hostDependencies = ReactPreview.hostDependencies;

  /**
   * Default package.json modifications.
   */
  packageJson = {
    main: "dist/index.js",
    type: "module",
    types: "index.ts",
  };

  /**
   * return an instance of a Compiler. use components like typescript-compiler (teambit.typescript/typescript-compiler)
   * or our babel-compiler (teambit.compilation/babel-compiler).
   */
  // TODO: make sure we only run compiler once @david.
  compiler(): EnvHandler<Compiler> {
    // const babelConfig = this.react.getBabelDefaultConfig();
    // const babelCompiler = new BabelCompiler(babelConfig);
    return TypescriptCompiler.from({
      tsconfig: require.resolve("./config/tsconfig.json"),
      types: resolveTypes(__dirname, ["./types"]),
      typescript,
    });
  }

  /**
   * returns an instance of a Bit tester implementation. use components like mocha-tester or
   * jest-tester or [build your own](https://bit.dev/docs/tester/implement-tester).
   */
  tester(): EnvHandler<Tester> {
    // TODO @gilad: check jest tester on watch.
    // TODO: upgrade to jest 29.
    return JestTester.from({
      config: require.resolve("./config/jest.config"),
      jest: require.resolve("jest"),
    });
  }

  /**
   * return an instance of a Bit preview instance. used for preview purposes.
   * base preview is a general purpose webpack preview.
   */
  preview(): EnvHandler<Preview> {
    return ReactPreview.from({
      /**
       * override the default docs template for components.
       */
      // docsTemplate: require.resolve('./preview/docs'),
      /**
       * mounters are used to mount components to DOM
       * during preview. use them for wrapping your components
       * with routing, theming, data fetching or other types
       * of providers.
       */
      mounter: require.resolve("./preview/mounter"),
      // transformers: [webpackTransformer],
      // webpackModulePath: require.resolve("webpack"),
      // webpackDevServerModulePath: require.resolve("webpack-dev-server")
    });
  }

  /**
   * returns an instance of the default TypeScript extractor.
   * used by default for type inference for both JS and TS.
   */
  schemaExtractor(): EnvHandler<SchemaExtractor> {
    return TypeScriptExtractor.from({
      tsconfig: require.resolve("./config/tsconfig.json"),
    });
  }

  /**
   * returns an instance of the default ESLint.
   * config files would be used to validate coding standards in components.
   * bit will write the minimum required files in any workspace to optimize
   * for dev experience.
   */
  linter() {
    return ESLintLinter.from({
      configPath: require.resolve("./config/eslintrc.js"),
      eslint: ESLintLib,
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
      // resolve all plugins from the react environment.
      pluginsPath: __dirname,
      tsconfig: require.resolve("./config/tsconfig.json"),
    });
  }

  /**
   * used by bit's formatter. helps to standardize and automate
   * code styling. can be used a build task or using bit lint and common
   * ides.
   */
  formatter() {
    return PrettierFormatter.from({
      configPath: require.resolve("./config/prettier.config.js"),
    });
  }

  /**
   * define the build pipeline for a component.
   * pipelines are optimized for performance and consistency.
   * making sure every component is independently built and tested.
   */
  build() {
    // :TODO fix build task
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: require.resolve("./config/tsconfig.json"),
        types: resolveTypes(__dirname, ["./types"]),
        typescript,
      }),
      EslintTask.from({
        configPath: require.resolve("./config/eslintrc.js"),
        eslint: ESLintLib,
        extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
        // resolve all plugins from the react environment.
        pluginsPath: __dirname,
        tsconfig: require.resolve("./config/tsconfig.json"),
      }),
      JestTask.from({
        config: require.resolve("./config/jest.config"),
        jest: require.resolve("jest"),
      }),
    ]);
  }

  /**
   * add build tasks to execute upon [snap](https://bit.dev/docs/snaps).
   * use the snap pipeline for staging and test deployments
   */
  snap() {
    return Pipeline.from([]);
  }

  /**
   * add build tasks to execute upon [tag](https://bit.dev/docs/tags).
   * use the tag pipeline for deployments, or other tasks required for
   * publishing a semantic version for a component.
   */
  tag() {
    return Pipeline.from([]);
  }

  /**
   * a list of starters for new projects. this helps create a quick and
   * standardized
   */
  starters() {
    return StarterList.from([ReactWorkspaceStarter.from()]);
  }

  /**
   * set a list of component templates to use across your
   * workspaces. new workspaces would be set to include
   * your envs by default.
   */
  generators() {
    return TemplateList.from([
      ReactComponentTemplate.from(),
      ReactHookTemplate.from(),
      ReactContextTemplate.from(),
      ReactAppTemplate.from(),
      ReactJSComponentTemplate.from(),
      ReactEnvTemplate.from(),
    ]);
  }

  apps(): EnvHandler<AppTypeList> {
    return AppTypeList.from([ReactAppType.from()]);
  }

  /**
   * configure and control the packaging process of components.
   */
  package() {
    return PackageGenerator.from({
      npmIgnore: this.npmIgnore,
      packageJson: this.packageJson,
    });
  }
}

export default new ReactEnv();
