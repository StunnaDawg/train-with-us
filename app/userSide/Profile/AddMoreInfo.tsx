import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { useRoute } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import Tabs from "./AddInfoComponents/TabsInfo"
import AboutMeEdit from "./AddInfoComponents/AboutMeEdit"
import InterestsEdit from "./AddInfoComponents/InterestsEdit"

const AddMoreInfo = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [aboutMe, setAboutMe] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const route = useRoute<RouteProp<RootStackParamList, "AddMoreUserInfo">>()
  const currentUser = route.params.userProfile

  const changeToAboutMeTab = () => {
    setAboutMe(true)
  }

  const changeToInterestTab = () => {
    setAboutMe(false)
  }

  return (
    <SafeAreaView className="flex-1">
      <ScrollView scrollEnabled={false} className="flex-1">
        <View className="flex flex-row justify-center">
          <Text className="text-2xl font-bold m-1">My Profile</Text>
        </View>

        <UserProfilePic profile={currentUser} refresh={refreshing} />

        <View className="mt-20">
          <Tabs
            changeToAboutMeTab={changeToAboutMeTab}
            changeToInterestTab={changeToInterestTab}
            aboutMe={aboutMe}
          />
        </View>
        {loading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : aboutMe ? (
          <View>
            <AboutMeEdit currentUserId={currentUser.id} />
          </View>
        ) : (
          <View>
            <InterestsEdit currentUserId={currentUser.id} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddMoreInfo
