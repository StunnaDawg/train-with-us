import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"

type UserProfilePicProps = {
  refresh: boolean
  profile: Profile | null
}

const UserProfilePic = ({ refresh, profile }: UserProfilePicProps) => {
  const [files, setFiles] = useState<FileObject[]>([])
  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const navigation = useNavigation<NavigationType>()

  const { user } = useAuth()

  useEffect(() => {
    if (!user) return
    useCurrentUser(user.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return
    useCurrentUser(user.id, setCurrentUser)
  }, [refresh])

  useEffect(() => {
    if (!user) return

    // Load user images
    loadImages()
  }, [currentUser])

  const loadImages = async () => {
    if (!currentUser?.id) return

    try {
      const { data, error } = await supabase.storage
        .from("photos")
        .list(currentUser.id) // Assuming 'photos/userId' is the folder structure.

      if (error) throw error

      if (data) {
        setFiles(data)
      }
    } catch (error) {
      console.error("Failed to load images:", error)
    }
  }
  return (
    <View className="flex flex-row flex-1 justify-center mt-12">
      <View>
        <SinglePic
          size={230}
          item={files[0]}
          avatarRadius={230}
          noAvatarRadius={230}
        />
        <View className="flex flex-row justify-center mt-4 items-center">
          <Text className="font-bold text-3xl mx-2">{profile?.first_name}</Text>
          <Pressable
            onPress={() => {
              navigation.navigate("UserEditProfile")
            }}
          >
            <FontAwesome6 name="edit" size={24} color="blue" />
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default UserProfilePic
