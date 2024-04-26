import { View, Text } from "react-native"
import React from "react"

const EventCheckoutTitle = () => {
  return (
    <View className="flex flex-row justify-center">
      <View className="items-center ">
        <Text className="font-bold text-lg">Friday May 10th</Text>
        <View className="rounded-full border-white px-5 my-1 bg-white">
          <Text
            className="font-bold text-lg
          "
          >
            Blended Atheltics
          </Text>
        </View>
        <Text className="font-bold text-lg">In-House Competition</Text>
      </View>
    </View>
  )
}

export default EventCheckoutTitle
