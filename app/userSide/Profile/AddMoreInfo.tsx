import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useState } from "react"
import UserProfilePic from "./components/UserProfilePic"
import { useRoute } from "@react-navigation/native"
import { RouteProp } from "@react-navigation/native"
import { RootStackParamList } from "../../@types/navigation"
import Tabs from "./AddInfoComponents/TabsInfo"
import AboutMeEdit from "./AddInfoComponents/AboutMeEdit"
import InterestsEdit from "./AddInfoComponents/InterestsEdit"
import BackButton from "../../components/BackButton"

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
      <View className="flex-1">
        <View className="flex flex-row justify-between mx-2 items-center">
          <View>
            <BackButton size={32} />
          </View>
          <Text className="text-2xl font-bold m-1">My Profile</Text>

          <View />
        </View>

        <UserProfilePic profile={currentUser} refresh={refreshing} />

        <View className="">
          <Tabs
            changeToAboutMeTab={changeToAboutMeTab}
            changeToInterestTab={changeToInterestTab}
            aboutMe={aboutMe}
          />
        </View>
        {loading ? (
          <View className="flex-1 justify-center items-center">
            <Text>Loading...</Text>
          </View>
        ) : aboutMe ? (
          <View className="flex-1">
            <AboutMeEdit currentUserId={currentUser.id} />
          </View>
        ) : (
          <View className="flex-1">
            <InterestsEdit currentUserId={currentUser.id} />
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

export default AddMoreInfo
