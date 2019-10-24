import typescriptPlugin from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
// import docGenPlugin from "babel-plugin-react-docgen-typescript";
import ttypescript from "ttypescript";
import execute from "rollup-plugin-execute";

import pkg from "./package.json";

const NODE_ENV = process.env.NODE_ENV || "development";
const __DEV__ = NODE_ENV === "development";
const dependencies = Object.keys(pkg.dependencies || {});
const isStoryBuild = NODE_ENV === "storybook";
const playgroundNativeUI =
  "./CohubUIPlayground/node_modules/@cohubinc/cohub-native-ui/";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  ],
  external: dependencies,
  plugins: [
    replace({
      __DEV__,
      exclude: "node_modules/**"
    }),
    typescriptPlugin({
      typescript: ttypescript,
      tsconfig: "./tsconfig.build.json"
    }),
    babel({
      babelrc: false,
      extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"]
    }),
    commonjs(),
    execute("cp ./dist/index.d.ts ./dist/index.esm.d.ts"),
    execute(
      `sleep 2 && cp -R ./dist ${playgroundNativeUI} && cp -R ./package.json ${playgroundNativeUI}`
    )
  ]
};
