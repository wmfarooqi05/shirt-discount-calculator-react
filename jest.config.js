/* eslint-disable no-undef */
module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      diagnostics: {
        warnOnly: true,
      },
    },
  },

  // Setup Enzyme
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
};
