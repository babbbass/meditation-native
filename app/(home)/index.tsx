import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import { router } from "expo-router"
import { Text, View } from "react-native"
import AppGradient from "@/components/AppGradient"
import { SafeAreaView } from "react-native-safe-area-context"
import SignIn from "../(auth)/sign-in"

export default function Page() {
  const { user } = useUser()

  return (
    <View className='flex-1 items-center'>
      <AppGradient colors={["rgba(238,238,240,0.7)", "rgba(238,238,240,0.9)"]}>
        <SafeAreaView className='flex-1 items-center'>
          <SignedIn>
            <Text>Bonjour {user?.emailAddresses[0].emailAddress}</Text>
            {router.push("/nature-meditation")}
          </SignedIn>
          <SignedOut>
            <SignIn />
          </SignedOut>
        </SafeAreaView>
      </AppGradient>
    </View>
  )
}
