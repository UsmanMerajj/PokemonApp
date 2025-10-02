// Global test setup

global.fetch = require("jest-fetch-mock");

jest.mock("react-native", () => ({
  ActivityIndicator: "ActivityIndicator",
  FlatList: ({ data, renderItem, testID }) => {
    const React = require("react");
    return React.createElement(
      "View",
      { testID },
      data && data.map
        ? data.map((item, index) => {
            return React.createElement(
              "View",
              { key: index },
              renderItem ? renderItem({ item, index }) : null
            );
          })
        : null
    );
  },
  Image: "Image",
  StyleSheet: {
    create: (styles) => styles,
    flatten: (styles) => styles || {},
  },
  Text: "Text",
  TouchableOpacity: ({ children, onPress, testID, style, ...props }) => {
    const React = require("react");
    return React.createElement(
      "View",
      {
        onPress,
        testID,
        style,
        accessible: true, // Add default accessibility
        ...props,
      },
      children
    );
  },
  View: "View",
}));

// Mock expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Stack: {
    Screen: ({ children }) => children,
  },
}));

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Global mocks
global.__DEV__ = true;
