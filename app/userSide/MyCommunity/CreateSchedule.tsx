import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"

const CreateSchedule = () => {
  const route = useRoute<RouteProp<RootStackParamList, "CreateSchedule">>()
  const communityId = route.params.communityId
  const navigation = useNavigation<NavigationType>()

  const CreateClassFunc = async () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Create Schedule"
        doneButtonText="Create"
        functionProp={() => CreateClassFunc()}
      />

      <View></View>
    </SafeAreaView>
  )
}

export default CreateSchedule
