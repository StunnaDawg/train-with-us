import { View, Text } from "react-native"
import React from "react"

const AboutViewEvent = () => {
  return (
    <View className="flex flex-row m-5">
      <View>
        <View>
          <Text className="font-bold text-xl">About this Event</Text>
        </View>

        <View className="my-1">
          <Text className="text-lg">
            Join us at the Champion Fitness Center for the "Ultimate Fitness
            Challenge 2024," a day full of strength, endurance, and fun! Whether
            you're looking to test your limits or just want to enjoy a day of
            healthy competition and community spirit, this event is for you.
          </Text>
        </View>
      </View>
    </View>
  )
}

export default AboutViewEvent
