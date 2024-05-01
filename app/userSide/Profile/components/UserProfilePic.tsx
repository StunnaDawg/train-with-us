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
  const navigation = useNavigation<NavigationType>()

  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [refresh])

  useEffect(() => {
    if (currentUser?.photos_url === null || undefined) return
    setImageFiles(currentUser?.photos_url)
  }, [currentUser])
  return (
    <View className="flex flex-row flex-1 justify-center mt-12">
      <View>
        <SinglePic
          size={230}
          item={imageFiles?.[0]}
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
