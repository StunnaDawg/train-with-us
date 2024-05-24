import { View, Text } from "react-native"
import React from "react"
import { Image } from "expo-image"

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <View className="flex flex-row items-center">
      <View>
        <Image
          source={require("../../assets/images/TWU-Logo.png")}
          style={{ width: 90, height: 90 }}
        />
      </View>
      <View className="mx-2">
        <Text className="text-white text-3xl font-bold">{title}</Text>
      </View>
    </View>
  )
}

export default Header
