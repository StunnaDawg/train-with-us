import { View, Text, SafeAreaView, ScrollView } from "react-native"
import React, { useEffect, useState } from "react"
import ImageGrid from "./editProfileComponents/ImageGrid"
import ProfilePicture from "./editProfileComponents/ProfilePicture"
import AddMoreInfo from "./AddMoreInfo"
import BackButton from "../../components/BackButton"
import EditProfileSkeleton from "./editProfileComponents/EditProfileSkeleton"
import { useAuth } from "../../supabaseFunctions/authcontext"
import { Profile } from "../../@types/supabaseTypes"
import useCurrentUser from "../../supabaseFunctions/getFuncs/useCurrentUser"
import { ca } from "date-fns/locale"

const EditProfile = () => {
  const { user } = useAuth()
  const [currentUser, setCurrentUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const colorMode = "dark"

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
    <SafeAreaView className="flex-1">
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
        </ScrollView>
      ) : (
        <EditProfileSkeleton />
      )}
    </SafeAreaView>
  )
}

export default EditProfile
