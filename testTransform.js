//
// This is used to setup transformation of test files for jest
// Don't touch it, unless you want to spend time fixing import
// parsing errors (you don't).
//

const babelJest = require("babel-jest");

const babelOptions = {
  presets: [
    "module:metro-react-native-babel-preset",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-module-resolver",
      {
        root: ["./src/", "./dist/"],
        alias: {
          src: "./src",
        },
      },
    ],
    "@babel/plugin-proposal-class-properties",
  ],
};

module.exports = babelJest.createTransformer(babelOptions);
