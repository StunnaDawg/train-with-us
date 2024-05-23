import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import PhotoArray from "../Connections/components/PhotoArray"
import MessageButton from "../Connections/components/MessageButton"
import UserTopGyms from "../Profile/components/UserTopGyms"
import ActivitySection from "../Profile/components/ActivitySection"
import UserAboutSection from "../Profile/components/UserAboutSection"
import { useRoute } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import returnCommunityName from "../../utilFunctions/returnCommunityName"

const ViewUserProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewUserProfile">>()
  const member = route.params.userProfile

  const [primaryGymName, setPrimaryGymName] = useState<string>("")

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (member.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(member.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [member])
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full">
        <View className="flex flex-row justify-center mt-8 mb-2">
          <Text className="text-white text-3xl font-bold">
            {member.first_name}
          </Text>
        </View>
        <View>
          <PhotoArray profileId={member.id} index1={0} index2={1} index3={2} />
        </View>

        <View>
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={member.id}
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

        <View>
          <View className="ml-7">
            <Text className="font-medium">My Styles of Fitness:</Text>
          </View>
          <ActivitySection profile={member} />
        </View>

        <View className="mt-2">
          <PhotoArray profileId={member.id} index1={3} index2={4} index3={5} />
        </View>

        <View>
          <UserAboutSection profile={member} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ViewUserProfile
