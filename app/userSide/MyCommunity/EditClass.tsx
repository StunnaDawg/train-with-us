import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"

const EditClass = () => {
  const route = useRoute<RouteProp<RootStackParamList, "EditClass">>()
  const classId = route.params.classId
  const navigation = useNavigation<NavigationType>()

  const EditClassFunc = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Create Class"
        doneButtonText="Create"
        functionProp={() => EditClassFunc()}
      />

      <View></View>
    </SafeAreaView>
  )
}

export default EditClass
