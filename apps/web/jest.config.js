module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { configFile: "./babel.config.test.js" }],
  },
  moduleNameMapper: {
    "^@mui/icons-material/(.*)$": "<rootDir>/__mocks__/muiIconMock.js",
    "^@pokeman/ui$": "<rootDir>/__mocks__/pokeman-ui.js",
    "^@pokeman/hooks$": "<rootDir>/__mocks__/pokeman-hooks.js",
    "^@pokeman/utils$": "<rootDir>/__mocks__/pokeman-utils.js",
    "^@pokeman/types$": "<rootDir>/__mocks__/pokeman-types.js",
    "\\.(css|svg|png)$": "<rootDir>/__mocks__/fileMock.js",
    "^next/navigation$": "<rootDir>/__mocks__/next-navigation.js",
    "^next/font/(.*)$": "<rootDir>/__mocks__/next-font.js",
    "^react$": "<rootDir>/node_modules/react",
    "^react-dom$": "<rootDir>/node_modules/react-dom",
    "^react-dom/(.*)$": "<rootDir>/node_modules/react-dom/$1",
  },
  testMatch: ["**/__tests__/**/*.test.tsx", "**/__tests__/**/*.test.ts"],
};
