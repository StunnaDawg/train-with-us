import { View, Text, Pressable } from "react-native"
import React from "react"
import { Image } from "expo-image"
import BackButton from "./BackButton"
import { NavigationType } from "../@types/navigation"
import { useNavigation } from "@react-navigation/native"

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation<NavigationType>()
  return (
    <View className="flex flex-row items-center">
      <Pressable onPress={() => navigation.goBack()}>
        <Image
          source={require("../../assets/images/TWU-Logo.png")}
          style={{ width: 90, height: 90 }}
        />
      </Pressable>
      <View className="mx-2">
        <Text className="text-white text-2xl font-bold">{title}</Text>
      </View>
    </View>
  )
}

export default Header
