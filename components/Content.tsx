import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

export const Content = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className='flex-1 px-5 py-3'>{children}</SafeAreaView>
}
