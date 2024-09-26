import { View, Text, Pressable } from "react-native"
import { router } from "expo-router"
import React, { useContext } from "react"
import AppGradient from "@/components/AppGradient"
import AntDesign from "@expo/vector-icons/AntDesign"
import CustomButton from "@/components/CustomButton"
import { TimerContext } from "@/context/TimerContext"
const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext)
  const handlePress = (duration: number) => {
    setDuration(duration)
    router.back()
  }
  return (
    <View className='flex-1 relative'>
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <Pressable
          onPress={() => router.back()}
          className='absolute top-16 left-6 z-10'
        >
          <AntDesign name='leftcircleo' size={50} color='white' />
        </Pressable>
        <View className='h-4/5 justify-center'>
          <Text className='text-center font-bold text-3xl text-white mb-8'>
            Ajuste ta méditation
          </Text>
          <View>
            <CustomButton
              title='10 secondes'
              containerStyles='mb-5'
              onPress={() => {
                handlePress(10)
              }}
            />
            <CustomButton
              title='5 minutes'
              containerStyles='mb-5'
              onPress={() => {
                handlePress(5 * 60)
              }}
            />
            <CustomButton
              title='10 minutes'
              containerStyles='mb-5'
              onPress={() => {
                handlePress(10 * 60)
              }}
            />
            <CustomButton
              title='15 minutes'
              containerStyles='mb-5'
              onPress={() => {
                handlePress(15 * 60)
              }}
            />
          </View>
        </View>
      </AppGradient>
    </View>
  )
}

export default AdjustMeditationDuration
