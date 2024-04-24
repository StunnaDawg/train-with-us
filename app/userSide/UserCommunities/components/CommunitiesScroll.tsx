import { View, Text, ScrollView } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"

const CommunitiesScroll = () => {
  return (
    <View className="mt-8 px-5">
      <View className="px-3 mb-3">
        <Text className="font-bold text-3xl">My Communities</Text>
      </View>
      <ScrollView horizontal={true}>
        <View className="flex flex-row">
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              picNumber={0}
            />
          </View>
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              picNumber={0}
            />
          </View>
          <View className="m-2">
            <SinglePic
              size={55}
              avatarRadius={100}
              noAvatarRadius={100}
              picNumber={0}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default CommunitiesScroll
