import { Pipeline } from "@teambit/builder";
import { Compiler } from "@teambit/compiler";
import { ESLintLinter } from "@teambit/defender.eslint-linter";
import { EnvHandler } from "@teambit/envs";
import { PackageGenerator } from "@teambit/pkg";
import type { ReactEnvInterface } from "@teambit/react.react-env";
import { ReactEnv } from "@teambit/react.react-env";
import { TypescriptCompiler, TypescriptTask, resolveTypes } from "@teambit/typescript.typescript-compiler";
import { ESLint as ESLintLib } from "eslint";
import typescript from "typescript";

export class MyReactEnv extends ReactEnv implements ReactEnvInterface {
  name = "my-custom-react";

  icon = "https://static.bit.dev/extensions-icons/react.svg";

  compiler(): EnvHandler<Compiler> {
    return TypescriptCompiler.from({
      tsconfig: require.resolve("./config/tsconfig.json"),
      types: resolveTypes(__dirname, ["./types"]),
      typescript,
    });
  }

  linter() {
    return ESLintLinter.from({
      configPath: require.resolve("./config/eslintrc.js"),
      eslint: ESLintLib,
      extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
      // resolve all plugins from the react environment.
      pluginsPath: __dirname,
    });
  }

  /**
   * configure and control the packaging process of components.
   */
  package() {
    return PackageGenerator.from({
      npmIgnore: [],
      packageJson: {
        main: "dist/index.js",
        type: "module",
        types: "index.ts",
      },
    });
  }

  build() {
    // :TODO fix build task
    return Pipeline.from([
      TypescriptTask.from({
        tsconfig: require.resolve("./config/tsconfig.json"),
        types: resolveTypes(__dirname, ["./types"]),
        typescript,
      }),
    ]);
  }
}

export default new MyReactEnv();
