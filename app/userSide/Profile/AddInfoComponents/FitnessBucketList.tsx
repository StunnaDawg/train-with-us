import { View, Text } from "react-native"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../../@types/navigation"

const FitnessBucketList = () => {
  const route = useRoute<RouteProp<RootStackParamList, "FitnessBucketList">>()
  const userProfile = route.params.userProfile
  return (
    <View>
      <Text>FitnessBucketList</Text>
    </View>
  )
}

export default FitnessBucketList
