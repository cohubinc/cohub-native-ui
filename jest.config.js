module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    ".*": "babel-jest"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx|json)$",
    "^.+\\.module\\.(css|sass|scss)$",
    "^.(css|sass|scss)$",
    "^.+\\.(json)$",
    "node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers|jsbarcode|react-native-barcode-builder|@react-native-community/async-storage|@react-native-community/netinfo|actioncable|@kesha-antonov/react-native-action-cable)"
  ],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: [
    // "<rootDir>/test/setupEnzyme.ts",
    "@testing-library/jest-dom/extend-expect"
  ],
  moduleFileExtensions: ["js", "ts", "tsx"],
  modulePaths: ["<rootDir>", "<rootDir>/dist/"],
  moduleDirectories: ["node_modules", "/dist"],
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"]
};
