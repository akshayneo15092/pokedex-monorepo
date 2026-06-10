module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@mui/icons-material/(.*)$": "<rootDir>/__mocks__/muiIconMock.js",
    "^@pockeman/ui$": "<rootDir>/__mocks__/pockeman-ui.js",
    "^@pockeman/hooks$": "<rootDir>/__mocks__/pockeman-hooks.js",
    "^@pockeman/utils$": "<rootDir>/__mocks__/pockeman-utils.js",
    "^@pockeman/types$": "<rootDir>/__mocks__/pockeman-types.js",
    "\\.(css|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "^next/navigation$": "<rootDir>/__mocks__/next-navigation.js",
    "^next/font/(.*)$": "<rootDir>/__mocks__/next-font.js",
  },
  testMatch: ["**/__tests__/**/*.test.tsx", "**/__tests__/**/*.test.ts"],
};
