import { View, Text } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"

const ViewEventTitle = () => {
  return (
    <View className="flex flex-row items-center justify-center">
      <View className="m-5 items-center">
        <Text className="text-xl font-bold">Friday, May 10th</Text>
        <View className="border rounded-full p-1 px-4 bg-white border-white">
          <Text className="text-xl font-semibold">Blended Athletics</Text>
        </View>
        <Text className="text-xl font-bold">Event Type</Text>
      </View>

      <View className="border-white border-4">
        <SinglePic
          size={150}
          avatarRadius={0}
          noAvatarRadius={0}
          picNumber={0}
        />
      </View>
    </View>
  )
}

export default ViewEventTitle
