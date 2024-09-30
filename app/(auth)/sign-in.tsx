import { useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { Text, TextInput, Button, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import React from "react"
import CustomButton from "@/components/CustomButton"

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/")
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View className='flex-1 justify-center w-full'>
      <SafeAreaView className='w-11/12 mx-auto border border-gray-500/10 rounded-xl pb-4 px-7 bg-white'>
        <Text className='text-xl font-bold text-indigo-800 text-left w-full mb-4'>
          Connectes toi a ton compte
        </Text>
        <Text className='font-semibold text-black text-left w-full mb-2'>
          Email
        </Text>
        <TextInput
          autoCapitalize='none'
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          className='w-full border mb-8 border-gray-500/30 rounded-md p-3 py-1 font-bold text-black'
        />
        <Text className='font-semibold text-black text-left w-full mb-2'>
          Mot de passe
        </Text>
        <TextInput
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          className='w-full border border-gray-500/30 rounded-md p-3 py-1'
        />
        <CustomButton
          title='Se connecter'
          onPress={onSignInPress}
          containerStyles='w-full mt-8 bg-indigo-800 rounded-md'
          textStyles='text-white text-base'
        />
        <View className='flex-row justify-center items-center bg-gray-500/10 h-10 w-full gap-1 mt-10'>
          <Text>tu n'as pas de compte?</Text>
          <Link href='/sign-up'>
            <Text className='text-indigo-800 font-semibold'>S'enregistrer</Text>
          </Link>
        </View>
      </SafeAreaView>
    </View>
  )
}
