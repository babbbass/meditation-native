import { View, Text, ImageBackground, Pressable } from "react-native"
import MEDITATION_IMAGES from "@/constants/meditation-images"
import React, { useContext, useEffect, useState } from "react"
import AppGradient from "@/components/AppGradient"
import { router, useLocalSearchParams } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import CustomButton from "@/components/CustomButton"
import { Audio } from "expo-av"
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData"
import { TimerContext } from "@/context/TimerContext"

const Page = () => {
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext)
  const { id } = useLocalSearchParams()

  // const [secondRemaining, setSecondRemaining] = useState(10)
  const [isMeditating, setIsMeditating] = useState(false)
  const [audioSound, setAudioSound] = useState<Audio.Sound>()
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (secondsRemaining === 0) {
      setIsMeditating(false)
      return
    }

    if (isMeditating) {
      timerId = setInterval(() => {
        setDuration(secondsRemaining - 1)
      }, 1000)
    }

    return () => {
      clearInterval(timerId)
    }
  }, [secondsRemaining, isMeditating])

  const handleAdjustDuration = () => {
    if (isMeditating) toogleMeditationSessionStatus()
    router.push("/(modal)/adjust-meditation-duration")
  }
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0")

  const formattedTimeSeconds = String(
    Math.floor(secondsRemaining % 60)
  ).padStart(2, "0")

  const toogleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) setDuration(10)

    setIsMeditating(!isMeditating)
    await toogleSound()
  }

  const playSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName])
    setAudioSound(sound)

    return sound
  }

  const toogleSound = async () => {
    const sound = audioSound ? audioSound : await playSound()

    const status = await sound?.getStatusAsync()

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync()
      setIsPlayingAudio(true)
    } else {
      await sound?.pauseAsync()
      setIsPlayingAudio(false)
    }
  }

  useEffect(() => {
    return () => {
      setDuration(10)
      audioSound?.unloadAsync()
    }
  }, [audioSound])

  return (
    <View className='flex-1'>
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode='cover'
        className='flex-1'
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className='absolute top-16 left-6 z-10'
          >
            <AntDesign name='leftcircleo' size={50} color='white' />
          </Pressable>
          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
              <Text className='text-4xl text-blue-800 font-rmono'>
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>
          <View className='mb-5'>
            <CustomButton
              title='Durée de la session'
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop" : "Commencer la meditation"}
              onPress={toogleMeditationSessionStatus}
              containerStyles='mt-4'
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  )
}

export default Page
