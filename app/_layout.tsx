import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { SplashScreen, Stack } from "expo-router";

import { AppProvider } from "../store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useFonts } from "expo-font";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({});

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <AppProvider>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </AppProvider>
    </ApolloProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerBackVisible: false,
        headerShown: false,
      }}
    />
  );
}
