import { View, Text, SafeAreaView, ScrollView, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import ImageGrid from "./editProfileComponents/ImageGrid"
import ProfilePicture from "./editProfileComponents/ProfilePicture"
import AddMoreInfo from "./AddMoreInfo"
import BackButton from "../../components/BackButton"
import EditProfileSkeleton from "./editProfileComponents/EditProfileSkeleton"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../@types/navigation"
import { FontAwesome6 } from "@expo/vector-icons"

const EditProfile = () => {
  const { user } = useAuth()
  const [settingsPressed, setSettingsPressed] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const navigation = useNavigation<NavigationType>()

  const handleSettingsPressedIn = () => {
    setSettingsPressed(true)
  }

  const handleSettingsPressedOut = () => {
    setSettingsPressed(false)
  }

  const getUser = async () => {
    try {
      setLoading(true)
      if (!user) return
      useCurrentUser(user.id, setCurrentUser)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching current user:", error)
    }
  }

  useEffect(() => {
    getUser()
  }, [user])

  return (
    <SafeAreaView className="flex-1 mb-2">
      <View className="items-center flex flex-row justify-between">
        <View className="mx-2">
          <BackButton size={28} />
        </View>
        <Text className="font-bold text-lg">Edit Profile</Text>
        <View />
      </View>

      {!loading ? (
        <ScrollView className="flex-1">
          <View>
            <ProfilePicture currentUser={currentUser} setLoading={setLoading} />
          </View>
          <View className="m-5">
            <Text className="text-lg font-bold text-center mt-4">
              My Pictures
            </Text>
          </View>
          <View>
            <ImageGrid currentUser={currentUser} setLoading={setLoading} />
          </View>

          <AddMoreInfo />
          <View className="bg-slate-200 m-2 rounded-lg p-2">
            <View>
              <Text className="font-bold text-lg">Account</Text>
            </View>
            <Pressable
              onPressIn={handleSettingsPressedIn}
              onPressOut={handleSettingsPressedOut}
              className={`${settingsPressed ? "opacity-50" : null} mx-2 p-2`}
              onPress={() => navigation.navigate("UserSettings")}
            >
              <View className="flex flex-row justify-between">
                <View className="flex flex-row items-center">
                  <FontAwesome6 name="gear" size={18} />
                  <Text className="font-semibold mx-1">Account Settings</Text>
                </View>
                <FontAwesome6 name="chevron-right" size={18} />
              </View>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <EditProfileSkeleton />
      )}
    </SafeAreaView>
  )
}

export default EditProfile
