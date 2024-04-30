import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { FontAwesome6 } from "@expo/vector-icons"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"

const UserProfilePic = () => {
  const [files, setFiles] = useState<FileObject[]>([])
  const navigation = useNavigation<NavigationType>()

  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    loadImages()
  }, [user])

  const loadImages = async () => {
    const { data } = await supabase.storage.from("photos").list(user!.id)
    if (data) {
      setFiles(data)
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
          <Text className="font-bold text-3xl mx-2">Kimberley</Text>
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
