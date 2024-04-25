import { View, Text, Pressable } from "react-native"
import React from "react"
import { FontAwesome6 } from "@expo/vector-icons"

const ShowMap = () => {
  return (
    <Pressable className="flex flex-row items-center">
      <Text className="font-semibold mr-1 text-lg">Show Map</Text>
      <FontAwesome6 name="chevron-down" size={16} color="blue" />
    </Pressable>
  )
}

export default ShowMap
