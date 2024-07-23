import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome6 } from "@expo/vector-icons"

const AllEvents = () => {
  const [pressed, setPressed] = useState<boolean>(false)
  const navigation = useNavigation<NavigationType>()

  const handlePressIn = () => {
    setPressed(true)
  }
  const handlePressOut = () => {
    setPressed(false)
  }

  return (
    <Pressable
      className={`${pressed ? "opacity-50" : null}`}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => navigation.navigate("AllEventsPage")}
    >
      <View className="flex flex-col m-5 border-b">
        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg font-bold m-1 text-white ">
            See All Events
          </Text>

          <FontAwesome6 name="arrow-right" size={20} color="white" />
        </View>
      </View>
    </Pressable>
  )
}

export default AllEvents
