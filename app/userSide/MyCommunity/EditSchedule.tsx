import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"

const EditSchedule = () => {
  const route = useRoute<RouteProp<RootStackParamList, "EditSchedule">>()
  const scheduleId = route.params.scheduleId
  const navigation = useNavigation<NavigationType>()

  const EditScheduleFunc = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Create Class"
        doneButtonText="Create"
        functionProp={() => EditScheduleFunc()}
      />

      <View></View>
    </SafeAreaView>
  )
}

export default EditSchedule
