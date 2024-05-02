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
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../@types/supabaseTypes"

const ViewRequestProfile = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "ViewRequestProfile">>()
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const userId = route.params.userId

  useEffect(() => {
    useCurrentUser(userId, setCurrentUser)
  }, [])
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full">
        <View className="flex flex-row justify-center mt-8 mb-2">
          <Text className="text-3xl font-bold">{currentUser?.first_name}</Text>
        </View>
        <View>
          <PhotoArray profileId={currentUser?.id} />
        </View>

        <View>
          <MessageButton
            setLoading={setLoading}
            loading={loading}
            profileId={currentUser?.id}
            coach={false}
          />
        </View>

        <View>
          <UserTopGyms profile={currentUser} borderB={false} mt={false} />
        </View>

        <View>
          <View className="ml-7">
            <Text className="font-medium">My Styles of Fitness:</Text>
          </View>
          <ActivitySection profile={currentUser} />
        </View>

        <View className="mt-2">
          <PhotoArray profileId={currentUser?.id} />
        </View>

        <View>
          <UserAboutSection profile={currentUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ViewRequestProfile
