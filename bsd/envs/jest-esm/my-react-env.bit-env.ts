import { Pipeline } from "@teambit/builder";
import { Compiler } from "@teambit/compiler";
import { EnvHandler } from "@teambit/envs";
import { PackageGenerator } from "@teambit/pkg";
import type { ReactEnvInterface } from "@teambit/react.react-env";
import { ReactEnv } from "@teambit/react.react-env";
import {
  TypescriptCompiler,
  TypescriptTask,
  resolveTypes,
} from "@teambit/typescript.typescript-compiler";
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

  /**
   * configure and control the packaging process of components.
   */
  package() {
    return PackageGenerator.from({
      packageJson: {
        main: "dist/index.js",
        types: "index.ts",
      },
      npmIgnore: [],
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
