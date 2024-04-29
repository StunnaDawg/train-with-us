import { View, Text, Pressable } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"

const UserProfilePic = () => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-row flex-1 justify-center mt-12">
      <View>
        <SinglePic
          size={230}
          picNumber={0}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4 items-center">
          <Text className="font-bold text-3xl mx-2">Kimberley</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("UserEditProfile")
            }}
          >
            <FontAwesome6 name="edit" size={24} color="blue" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
