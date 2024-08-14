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
    <SafeAreaView className="flex-1 mb-2">
      <View className="items-center flex flex-row px-1">
        <View className="">
          <BackButton size={28} />
        </View>
      </View>

      {!loading && currentUser ? (
        <>
          <ScrollView className="flex-1">
            <View>
              <View>
                <Text className="text-lg font-bold text-center ">Pictures</Text>
              </View>
              <View>
                <ImageGrid currentUser={currentUser} />
              </View>
            </View>
            <View className="flex flex-row justify-center">
              <View>
                <View>
                  <Text className="text-lg font-bold text-center mt-4">
                    Profile Picture
                  </Text>
                </View>

                <View>
                  <ProfilePicture currentUser={currentUser} />
                </View>
              </View>
            </View>
            <AddMoreInfo />
          </ScrollView>
        </>
      ) : (
        <EditProfileSkeleton />
      )}
    </SafeAreaView>
  )
}

export default EditProfile
