import { SplashScreen, Stack } from "expo-router"
import { useFonts } from "expo-font"
import { useEffect } from "react"
import TimerProvider from "@/context/TimerContext"
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo"
import * as SecureStore from "expo-secure-store"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

SplashScreen.preventAutoHideAsync()

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log("No values stored under key: " + key)
      }
      return item
    } catch (error) {
      console.error("SecureStore get item error: ", error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  )
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf"),
  })

  useEffect(() => {
    if (error) throw error
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded, error])

  if (!fontsLoaded) return null
  if (!fontsLoaded && !error) return null

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <TimerProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(home)' options={{ headerShown: false }} />
            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
              name='meditate/[id]'
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='(modal)/adjust-meditation-duration'
              options={{ headerShown: false, presentation: "modal" }}
            />
          </Stack>
        </TimerProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
