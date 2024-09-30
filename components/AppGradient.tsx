import React from "react"
import { LinearGradient } from "expo-linear-gradient"
import { Content } from "./Content"
const AppGradient = ({
  children,
  colors,
}: {
  children: React.ReactNode
  colors: string[]
}) => {
  return (
    <LinearGradient className='flex-1 w-full' colors={colors}>
      <Content>{children}</Content>
    </LinearGradient>
  )
}

export default AppGradient
