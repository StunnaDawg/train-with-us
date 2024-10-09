import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React from "react"
import { RouteProp, useNavigation } from "@react-navigation/native"

import { useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../../@types/navigation"
import BackButton from "../../../components/BackButton"
import AttendeeCard from "./AttendeeCard"
const Waitlist = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewEventWaitlist">>()
  const waitlistProfiles = route.params.profile

  return (
    <SafeAreaView className="flex-1">
      <View className="m-2">
        <View className="flex flex-row justify-between items-center">
          <BackButton />
          <Text className=" font-bold text-xl">Waitlist</Text>
          <View />
        </View>
        <ScrollView className=" h-full">
          {waitlistProfiles && waitlistProfiles?.length > 0 ? (
            waitlistProfiles?.map((member) => {
              return <AttendeeCard key={member.id} member={member} />
            })
          ) : (
            <Text className="text-center text-gray-500">
              No one on waitlist
            </Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Waitlist
