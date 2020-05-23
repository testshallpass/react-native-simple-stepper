module.exports = {
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>setupTests.js"],
  testPathIgnorePatterns: ["/node_modules/", "/example/", "/coverage/"],
  preset: "react-native",
  coverageDirectory: "./coverage/",
  collectCoverage: true,
};
