module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  reporters: [
    "default",
    [
      "jest-html-reporter",
      {
        pageTitle: "Test Report",
        outputPath: "./test-report.html",
        includeFailureMsg: true,
        includeConsoleLog: true,
      },
    ],
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!react-router-dom/.*)",
  ],
  moduleDirectories: ["node_modules", "src"],
};
