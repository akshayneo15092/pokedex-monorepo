module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@mui/icons-material/(.*)$": "<rootDir>/__mocks__/muiIconMock.js",
    "\\.(css|svg|png|avif)$": "<rootDir>/__mocks__/fileMock.js",
  },
  testMatch: ["**/__tests__/**/*.test.tsx"],
};
