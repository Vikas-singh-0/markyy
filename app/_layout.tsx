import Colors from "@/constants/Colors";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
const CLERK_PUBLISHABLE_KEY = 'pk_test_c291Z2h0LXByYXduLTIuY2xlcmsuYWNjb3VudHMuZGV2JA';
import * as SecureStore from 'expo-secure-store';
import "react-native-reanimated";



export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });


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

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();


  const tokenCache = {
    getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return null;
      }
    },
  };
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={25} color={Colors.dark} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={25} color={Colors.dark} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Link href={"/help"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="help-circle-outline"
                    size={25}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="verify/[phone]"
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: Colors.background },
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={25} color={Colors.dark} />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Link href={"/help"} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="help-circle-outline"
                    size={25}
                    color={Colors.dark}
                  />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="help"
          options={{ presentation: "modal", title: "Help" }}
        />
      </Stack>
    </ClerkProvider>
  );
}
