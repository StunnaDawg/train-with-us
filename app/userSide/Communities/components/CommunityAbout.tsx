import { View, Text } from "react-native"
import React from "react"
import { Communities } from "../../../@types/supabaseTypes"

type CommunityAboutProps = {
  community: Communities | null
}

const CommunityAbout = ({ community }: CommunityAboutProps) => {
  return (
    <View className="items-center">
      <View className="">
        <Text className="text-xl font-bold">Welcome to Blended Athletics</Text>
      </View>

      <View className="mx-4">
        <Text className="font-semibold text-lg text-wrap">
          At FitCommUnity, we believe in more than just workouts; we believe in
          building a supportive network where every member inspires and uplifts
          each other. Founded in 2015 in the heart of the city, FitCommUnity has
          grown from a small group of fitness enthusiasts into a thriving
          community of people who live, breathe, and celebrate a healthy
          lifestyle together.
        </Text>
      </View>
    </View>
  )
}

export default CommunityAbout
