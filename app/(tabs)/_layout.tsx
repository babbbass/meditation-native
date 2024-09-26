import React from "react"
import { Tabs } from "expo-router"
import Colors from "@/constants/Colors"
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons"

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
}
export default function Page() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name='nature-meditation'
        options={{
          tabBarLabel: "Meditations",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='flower-tulip'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='affirmations'
        options={{
          tabBarLabel: "Affirmations",
          tabBarIcon: ({ color }) => (
            <Entypo name='thumbs-up' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
