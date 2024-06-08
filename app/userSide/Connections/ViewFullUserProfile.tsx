import { View, Text, SafeAreaView } from "react-native"
import React, { useEffect, useState } from "react"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import PhotoArray from "./components/PhotoArray"
import MessageButton from "./components/MessageButton"
import GenericButton from "../../components/GenericButton"
import UserTopGyms from "../Profile/components/UserTopGyms"
import ActivitySection from "../Profile/components/ActivitySection"
import UserAboutSection from "../Profile/components/UserAboutSection"
import returnCommunityName from "../../utilFunctions/returnCommunityName"

const ViewFullUserProfile = () => {
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewFullUserProfile">>()
  const profile = route.params.user

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (profile?.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(profile?.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [profile])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex flex-row justify-center mt-1 mb-2">
        <Text className="text-2xl font-bold">
          {profile?.first_name} {profile?.last_name}
        </Text>
      </View>
      <View>
        <PhotoArray index1={0} index2={1} index3={2} profileId={profile?.id} />
      </View>

      <View>
        <MessageButton
          setLoading={setLoading}
          loading={loading}
          profileId={profile?.id}
          coach={false}
        />
      </View>

      <View>
        <UserTopGyms
          communityName={primaryGymName}
          borderB={false}
          mt={false}
        />
      </View>

      {profile?.activities?.length && profile?.activities?.length > 0 && (
        <View className="flex flex-row items-center">
          <View className="ml-7">
            <Text className="font-medium text-lg">My Styles of Fitness:</Text>
          </View>
          <ActivitySection profile={profile} />
        </View>
      )}

      <View className="mt-1">
        <PhotoArray index1={3} index2={4} index3={5} profileId={profile?.id} />
      </View>

      <View>
        <UserAboutSection profile={profile} />
      </View>
    </SafeAreaView>
  )
}

export default ViewFullUserProfile
