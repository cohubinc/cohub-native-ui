import typescriptPlugin from "rollup-plugin-typescript2";
import sass from "node-sass";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import presetEnv from "postcss-preset-env";
import flexbugFixes from "postcss-flexbugs-fixes";
import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
// import docGenPlugin from "babel-plugin-react-docgen-typescript";
import ttypescript from "ttypescript";
import execute from "rollup-plugin-execute";
import nodeResolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

const NODE_ENV = process.env.NODE_ENV || "development";
const __DEV__ = NODE_ENV === "development";
const dependencies = Object.keys(pkg.dependencies || {});
const isStoryBuild = NODE_ENV === "storybook";

import baseRollupConfig from "./rollup.config";

export default {
  ...baseRollupConfig,
  output: [
    {
      file: pkg.reactNative,
      format: "cjs",
      sourcemap: true
    }
  ]
};
