import { Stack } from "expo-router/stack"
import { View } from "react-native"

export default function Layout() {
  return (
    // <View>
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
    </Stack>
    // </View>
  )
}
