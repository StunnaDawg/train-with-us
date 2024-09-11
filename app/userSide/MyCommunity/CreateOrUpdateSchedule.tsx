import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"

const CreateOrUpdateSchedule = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "CreateOrUpdateClassSchedule">>()
  const community = route.params.community
  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <View className="flex flex-row  justify-between items-center mx-2">
        <BackButton size={22} colour="white" />
        <View>
          <Text className="text-white text-xl font-semibold">
            Edit or Create Class Schedule
          </Text>
        </View>

        <View />
      </View>
    </SafeAreaView>
  )
}

export default CreateOrUpdateSchedule
