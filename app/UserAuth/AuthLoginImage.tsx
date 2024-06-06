import { View, Text } from "react-native"
import React from "react"
import { Image } from "expo-image"

const AuthLoginImage = () => {
  return (
    <View className="items-center">
      <Image
        source={require("./TWU-Logo.png")}
        style={{ width: 250, height: 250 }}
      />
      <Text className=" font-extrabold text-4xl text-yellow-300">
        Train With Us
      </Text>
      <Text className="font-extrabold text-2xl text-white">Beyond Fitness</Text>
    </View>
  )
}

export default AuthLoginImage
