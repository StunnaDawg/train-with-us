import { View, Text } from "react-native"
import React from "react"
import { RootStackParamList } from "../../../@types/navigation"
import { RouteProp, useRoute } from "@react-navigation/native"

const FitnessGoals = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessGoals">>()
  const userProfile = route.params.userProfile
  return (
    <View>
      <Text>FitnessGoals</Text>
    </View>
  )
}

export default FitnessGoals
