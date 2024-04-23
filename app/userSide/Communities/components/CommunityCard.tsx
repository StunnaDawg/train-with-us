import { View, Text, Pressable } from "react-native"
import React from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import SinglePic from "../../../components/SinglePic"

const CommunityCard = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <Pressable onPress={() => {}}>
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={90}
            picNumber={0}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className="font-bold text-2xl">Blended</Text>
          <Text className="text-xs">10km away</Text>
          <View className="border-b p-3" />
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityCard
