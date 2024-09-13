import { View, Text, SafeAreaView } from "react-native"
import React from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import BackButton from "../../components/BackButton"
import EditProfileTopBar from "../../components/TopBarEdit"

const ManageClasses = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ManageClasses">>()
  const community = route.params.community
  const navigation = useNavigation<NavigationType>()

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Manage Classes"
        cancelText={"Back"}
        doneButtonText="Create"
        functionProp={() => navigation.navigate("AllEventsPage")}
      />
    </SafeAreaView>
  )
}

export default ManageClasses
