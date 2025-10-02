import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#2462F3" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="index" options={{ title: "PokeReact" }} />
          <Stack.Screen
            name="pokemon/[id]"
            options={{ title: "Pokemon Details" }}
          />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
