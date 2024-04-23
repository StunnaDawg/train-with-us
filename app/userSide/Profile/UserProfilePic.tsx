import { View, Text } from "react-native"
import React from "react"
import SinglePic from "../../components/SinglePic"

const UserProfilePic = () => {
  return (
    <View className="flex flex-row flex-1 justify-center mt-12">
      <View>
        <SinglePic
          size={230}
          picNumber={0}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4">
          <Text className="font-bold text-3xl">Kimberley</Text>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
