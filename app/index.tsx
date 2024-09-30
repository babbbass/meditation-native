import { View, Text, ImageBackground } from "react-native"
import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"

import beachImage from "@/assets/meditation-images/beach.webp"
import { SafeAreaView } from "react-native-safe-area-context"
import CustomButton from "@/components/CustomButton"
import { useRouter } from "expo-router"
import AppGradient from "@/components/AppGradient"

export default function index() {
  const router = useRouter()
  return (
    <View className='flex-1'>
      <ImageBackground
        source={beachImage}
        resizeMode='cover'
        className='flex-1'
      >
        <AppGradient colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}>
          <SafeAreaView className='flex-1 px-1 justify-between'>
            <View>
              <Text className='text-center text-white font-bold text-4xl'>
                Meditation Facile
              </Text>
              <Text className='text-center text-white text-regular text-2xl mt-3'>
                La meditation pour tous
              </Text>
            </View>
            <View>
              <CustomButton
                // onPress={() => router.push("/nature-meditation")}
                onPress={() => router.push("/(home)")}
                title='Commencer'
              />
            </View>
            <StatusBar style='light' />
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}
