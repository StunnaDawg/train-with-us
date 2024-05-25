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
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import MyEventsButton from "../../components/MyEventsButton"
import PhotoArray from "../Connections/components/PhotoArray"
import { FontAwesome6 } from "@expo/vector-icons"
import returnCommunityName from "../../utilFunctions/returnCommunityName"
import sendNotification from "../../utilFunctions/sendNotification"
import PhotoArrayProfile from "./components/PhotoArrayProfile"

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

  useFocusEffect(
    useCallback(() => {
      const getUser = async () => {
        setLoading(true)
        if (!user) return
        useCurrentUser(user?.id, setCurrentUser)
        setLoading(false)
      }

      getUser()

      return () => {
        // Optional cleanup actions
      }
    }, [user, setCurrentUser])
  )

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

      <View className="flex flex-row justify-center mt-3">
        <WhiteSkinnyButton
          textSize="text-xl"
          width={200}
          text="Test notifications"
          buttonFunction={() => {
            if (currentUser && currentUser.expo_push_token) {
              sendNotification(
                currentUser.expo_push_token,
                "Test Notification",
                "This is a test notification"
              )
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
        <PhotoArrayProfile
          index1={0}
          index2={1}
          index3={2}
          profileId={user?.id}
        />
        <PhotoArrayProfile
          index1={3}
          index2={4}
          index3={5}
          profileId={user?.id}
        />
      </View>
    </ScrollView>
  )
}

export default ProfileView
