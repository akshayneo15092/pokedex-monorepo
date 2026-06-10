module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|js)$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};
