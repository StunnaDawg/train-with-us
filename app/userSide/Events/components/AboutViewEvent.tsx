import { View, Text } from "react-native"
import React from "react"

type AboutViewEventProps = {
  description: string | undefined | null
}

const AboutViewEvent = ({ description }: AboutViewEventProps) => {
  return (
    <View className="flex flex-row m-5">
      <View>
        <View>
          <Text className="font-bold text-xl">About this Event</Text>
        </View>

        <View className="my-1">
          <Text className="text-lg">{description}</Text>
        </View>
      </View>
    </View>
  )
}

export default AboutViewEvent
