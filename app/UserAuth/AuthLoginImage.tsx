import { View, Text } from "react-native"
import React from "react"
import { Image } from "expo-image"

const AuthLoginImage = () => {
  return (
    <View className="items-center">
      <Image
        source={require("./TWU-Logo.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text className=" font-extrabold text-xl text-yellow-300">
        Train With Us
      </Text>
      <Text className="font-extrabold text-lg text-white">Beyond Fitness</Text>
    </View>
  )
}

export default AuthLoginImage
