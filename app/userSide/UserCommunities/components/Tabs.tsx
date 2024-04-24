import { View, Text, Pressable } from "react-native"
import React from "react"

const Tabs = () => {
  return (
    <View className="flex flex-row justify-center">
      <Pressable className=" mx-2 p-1 px-4 border rounded-full">
        <Text className=" font-bold text-md">My Messages</Text>
      </Pressable>

      <Pressable className=" mx-2 first-line:p-1 px-4 border rounded-full">
        <Text className=" font-bold text-md">Communities</Text>
      </Pressable>
    </View>
  )
}

export default Tabs
