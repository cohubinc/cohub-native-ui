import typescriptPlugin from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import flow from "rollup-plugin-flow";
// import docGenPlugin from "babel-plugin-react-docgen-typescript";
import ttypescript from "ttypescript";
import execute from "rollup-plugin-execute";

import pkg from "./package.json";

const NODE_ENV = process.env.NODE_ENV || "development";
const __DEV__ = NODE_ENV === "development";
const dependencies = Object.keys(pkg.dependencies || {});
const isStoryBuild = NODE_ENV === "storybook";

const pathsToCopyBuildToo = ["./CohubUIPlayground"].map(
  app => `${app}/node_modules/@cohubinc/cohub-native-ui/`
);

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "esm",
      sourcemap: true
    }
  ],
  external: dependencies,
  plugins: [
    flow(),
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
      presets: ["@babel/preset-react", "@babel/preset-flow"]
    }),
    commonjs(),
    execute("cp ./dist/index.d.ts ./dist/index.esm.d.ts"),
    ...pathsToCopyBuildToo.map(path =>
      execute(`sleep 2 && cp -R ./dist ${path} && cp -R ./package.json ${path}`)
    )
  ]
};
