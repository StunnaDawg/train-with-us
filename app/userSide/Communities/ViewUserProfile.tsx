import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React from "react"
import PhotoArray from "../Connections/components/PhotoArray"
import MessageButton from "../Connections/components/MessageButton"
import UserTopGyms from "../Profile/components/UserTopGyms"
import ActivitySection from "../Profile/components/ActivitySection"
import UserAboutSection from "../Profile/components/UserAboutSection"
import { useRoute } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"

const ViewUserProfile = () => {
  const route = useRoute<RouteProp<RootStackParamList, "ViewUserProfile">>()
  const member = route.params.userProfile
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full">
        <View className="flex flex-row justify-center mt-8 mb-2">
          <Text className="text-3xl font-bold">{member.first_name}</Text>
        </View>
        <View>
          <PhotoArray />
        </View>

        <View>
          <MessageButton profileId={member.id} coach={false} />
        </View>

        <View>
          <UserTopGyms profile={member} borderB={false} mt={false} />
        </View>

        <View>
          <View className="ml-7">
            <Text className="font-medium">My Styles of Fitness:</Text>
          </View>
          <ActivitySection profile={member} />
        </View>

        <View className="mt-2">
          <PhotoArray />
        </View>

        <View>
          <UserAboutSection profile={member} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ViewUserProfile
