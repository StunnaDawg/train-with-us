import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native"
import React, { useCallback, useEffect, useState } from "react"
import SinglePic from "../../components/SinglePic"
import UserProfilePic from "./components/UserProfilePic"
import UserTopGyms from "./components/UserTopGyms"
import UserAboutSection from "./components/UserAboutSection"
import ActivitySection from "./components/ActivitySection"
import PictureSection from "./components/PictureSection"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useAuth } from "../../supabaseFunctions/authcontext"
import WhiteSkinnyButton from "../../components/WhiteSkinnyButton"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import MyEventsButton from "../../components/MyEventsButton"
import PhotoArray from "../Connections/components/PhotoArray"
import { FontAwesome6 } from "@expo/vector-icons"
import returnCommunityName from "../../utilFunctions/returnCommunityName"

const ProfileView = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [primaryGymName, setPrimaryGymName] = useState<string>("")
  const navigation = useNavigation<NavigationType>()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (!user) return
    useCurrentUser(user?.id, setCurrentUser)
  }, [])

  useEffect(() => {
    const getPrimaryGymName = async () => {
      if (currentUser?.primary_gym === null) {
        setPrimaryGymName("No Primary Gym")
        return
      }
      const PrimaryGymName = await returnCommunityName(currentUser?.primary_gym)
      setPrimaryGymName(PrimaryGymName)
    }

    getPrimaryGymName()
  }, [currentUser])

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <MyEventsButton />

      <UserProfilePic profile={currentUser} refresh={refreshing} />

      <UserTopGyms communityName={primaryGymName} borderB={true} mt={true} />

      <View className="flex flex-row justify-center mt-3">
        <WhiteSkinnyButton
          textSize="text-xl"
          width={150}
          text="Add More Info"
          buttonFunction={() => {
            if (currentUser) {
              navigation.navigate("AddMoreUserInfo", {
                userProfile: currentUser,
              })
            }
          }}
        />
      </View>

      <UserAboutSection profile={currentUser} />

      <ActivitySection profile={currentUser} />

      <View className="my-2">
        <Pressable
          onPress={() => {
            navigation.navigate("UserEditProfile")
          }}
        >
          <View className="flex flex-row items-center">
            <Text className="font-bold text-xl mx-2">
              Change or Add Pictures!
            </Text>
            <FontAwesome6 name="edit" size={24} color="blue" />
          </View>
        </Pressable>
        <PhotoArray profileId={currentUser?.id} />
      </View>
    </ScrollView>
  )
}

export default ProfileView
