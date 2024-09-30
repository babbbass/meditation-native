import CustomButton from "@/components/CustomButton"
import { SafeAreaView } from "react-native-safe-area-context"
import * as React from "react"
import { TextInput, Button, View, Text } from "react-native"
import { useSignUp } from "@clerk/clerk-expo"
import { useRouter, Link } from "expo-router"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [userName, setUserName] = React.useState("")
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState("")

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        username: userName,
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace("/")
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View className='flex-1 justify-center w-full'>
      <SafeAreaView className='w-11/12 border mx-auto border-gray-500/10 rounded-xl pb-4 px-7 bg-white'>
        <Text className='font-rmono text-xl font-bold text-indigo-800 text-left w-full mb-8'>
          Crées toi un compte rapidement
        </Text>

        {!pendingVerification && (
          <>
            <Text className='font-semibold text-black text-left w-full mb-2'>
              Nom utilisateur
            </Text>
            <TextInput
              autoCapitalize='none'
              value={userName}
              onChangeText={(userName) => setUserName(userName)}
              className='w-full border mb-8 border-gray-500/30 rounded-md p-3 py-1 text-black'
            />
            <Text className='font-semibold text-black text-left w-full mb-2'>
              Email
            </Text>
            <TextInput
              autoCapitalize='none'
              value={emailAddress}
              onChangeText={(email) => setEmailAddress(email)}
              className='w-full border mb-8 border-gray-500/30 rounded-md p-3 py-1 text-black'
            />
            <Text className='font-semibold text-black text-left w-full mb-2'>
              Mot de passe
            </Text>
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              className='w-full border border-gray-500/30 rounded-md p-3 py-1 text-black'
            />
            <CustomButton
              title='Se connecter'
              onPress={onSignUpPress}
              containerStyles='w-full mt-8 bg-indigo-700 rounded-md'
              textStyles='text-white text-base'
            />
            <View className='flex-row justify-center items-center bg-gray-500/10 h-10 w-full gap-1 mt-10'>
              <Text>déja inscrit?</Text>
              <Link href='/sign-in'>
                <Text className='text-indigo-800 font-semibold'>
                  Se connecter
                </Text>
              </Link>
            </View>
          </>
        )}
        {pendingVerification && (
          <>
            <TextInput
              value={code}
              placeholder='Code...'
              onChangeText={(code) => setCode(code)}
            />
            <Button title='Verify Email' onPress={onPressVerify} />
          </>
        )}
      </SafeAreaView>
    </View>
  )
}
