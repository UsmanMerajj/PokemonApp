module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|expo|@expo|react-clone-referenced-element|@expo/vector-icons|react-native-svg|@reduxjs/toolkit|immer)",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(gif|ttf|eot|svg|png)$": "identity-obj-proxy",
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "services/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "utils/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{ts,tsx,js,jsx}",
    "<rootDir>/**/*.(test|spec).{ts,tsx,js,jsx}",
    "!<rootDir>/**/__tests__/**/test-utils.{ts,tsx,js,jsx}",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
