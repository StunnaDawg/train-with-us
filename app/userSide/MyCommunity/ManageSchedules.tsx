import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { NavigationType, RootStackParamList } from "../../@types/navigation"
import EditProfileTopBar from "../../components/TopBarEdit"
import supabase from "../../../lib/supabase"
import { CommunitySchedule } from "../../@types/supabaseTypes"
import showAlert from "../../utilFunctions/showAlert"

const ManageSchedules = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ManageClasses">>()
  const [communityClasses, setCommunityClasses] = useState<CommunitySchedule[]>(
    []
  )
  const community = route.params.community
  const navigation = useNavigation<NavigationType>()

  const getSchedulesFunc = async () => {
    console.log(community.id)
    try {
      const { data, error } = await supabase
        .from("community_class_schedule")
        .select("*")
        .eq("community_id", community.id)
      if (error) {
        showAlert({
          title: "Error",
          message: error.message,
        })
        throw error
      }
      if (data) {
        setCommunityClasses(data)
        console.log(data)
      }
    } catch (error) {
      showAlert({
        title: "Error",
        message: "Unexpected error",
      })
    }
  }

  useEffect(() => {
    getSchedulesFunc()
  }, [])

  return (
    <SafeAreaView className="flex-1 bg-primary-900">
      <EditProfileTopBar
        text="Manage Class Schedules"
        cancelText={"Back"}
        doneButtonText="Create"
        functionProp={() =>
          navigation.navigate("CreateSchedule", {
            communityId: community.id,
          })
        }
      />
    </SafeAreaView>
  )
}

export default ManageSchedules
