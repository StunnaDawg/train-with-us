import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native"
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
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
        <BackButton size={28} />
        <Text className="text-xl font-bold">Edit Profile</Text>
        <Pressable
          onPressIn={handleSettingsPressedIn}
          onPressOut={handleSettingsPressedOut}
        >
          <FontAwesome6
            name="gear"
            size={24}
            color={settingsPressed ? "gray" : "black"}
          />
        </Pressable>
      </View>

      {!loading && currentUser ? (
        <ScrollView className="flex-1">
          <View className="bg-white rounded-lg shadow-sm mx-4 my-2 p-4">
            <Text className="text-lg font-bold mb-4">Pictures</Text>
            <ImageGrid currentUser={currentUser} />
          </View>

          <View className="bg-white rounded-lg shadow-sm mx-4 my-2 p-4">
            <Text className="text-lg font-bold mb-4">Profile Picture</Text>
            <ProfilePicture currentUser={currentUser} />
          </View>

          <AddMoreInfo />
        </ScrollView>
      ) : (
        <EditProfileSkeleton />
      )}
    </SafeAreaView>
  )
}

export default EditProfile
