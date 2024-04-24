import { View, Text, Pressable } from "react-native"
import React from "react"
import SinglePic from "../../../components/SinglePic"

const Messages = () => {
  return (
    <View className="mt-8 mx-8 pb-2">
      <View>
        <Text className="font-bold text-xl">My Messages</Text>
      </View>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            picNumber={0}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">Jordan Forbes</Text>
          <Text className="text-sm">Hey, how are you?</Text>
        </View>
      </Pressable>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            picNumber={0}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">Jules Lemire</Text>
          <Text className="text-sm">Ya, I agree. that wou...</Text>
        </View>
      </Pressable>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            picNumber={0}
          />
        </View>
        <View>
          <Text className="font-bold mb-1">Jules Lemire</Text>
          <Text className="text-sm">Ya, I agree. that wou...</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Messages
