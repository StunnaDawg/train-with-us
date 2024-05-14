import { View, Text } from "react-native"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../../@types/navigation"

const ExperienceLvl = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessLevel">>()
  const userProfile = route.params.userProfile
  return (
    <View>
      <Text>ExperienceLvl</Text>
    </View>
  )
}

export default ExperienceLvl
