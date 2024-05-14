import { View, Text } from "react-native"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../../@types/navigation"

const OtherHobbies = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Hobbies">>()
  const userProfile = route.params.userProfile
  return (
    <View>
      <Text>OtherHobbies</Text>
    </View>
  )
}

export default OtherHobbies
