module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["./.next/", "./node_modules/"],
  testTimeout: 60000,
  testRegex: ".test.ts$",
  // testMatch: ["**/__tests__/*.(ts|tsx)"],
  setupFilesAfterEnv: ["./jest.setup.js"],
  // globals: {
  //   "ts-jest": {
  //     tsConfig: "tsconfig.jest.json"
  //   }
  // },
};