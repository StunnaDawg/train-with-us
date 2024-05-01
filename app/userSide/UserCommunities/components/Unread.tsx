import { View, Text, Pressable } from "react-native"
import React, { useState } from "react"
import SinglePic from "../../../components/SinglePic"
import { useNavigation } from "@react-navigation/native"
import { NavigationType } from "../../../@types/navigation"
import { fi } from "date-fns/locale"
import { useEffect } from "react"
import { FileObject } from "@supabase/storage-js"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import { Profile } from "../../../@types/supabaseTypes"

const Unread = () => {
  const navigation = useNavigation<NavigationType>()

  const [currentUser, setCurrentUser] = useState<Profile | null>({} as Profile)
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    useCurrentUser(user?.id, setCurrentUser)
  }, [user])

  useEffect(() => {
    if (currentUser?.photos_url === null || undefined) return
    setImageFiles(currentUser?.photos_url)
  }, [currentUser])
  return (
    <View className="mt-8 mx-8 border-b pb-2">
      <View>
        <Text className="font-bold text-xl">Unread</Text>
      </View>

      <Pressable
        // onPress={() => {
        //   navigation.navigate("MessagingScreen")
        // }}
        className="flex flex-row items-center"
      >
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={imageFiles?.[0]}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">Jordan Forbes</Text>
          <Text className="text-sm">Hey, how are you?</Text>
        </View>
      </Pressable>

      <Pressable className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={55}
            avatarRadius={100}
            noAvatarRadius={100}
            item={imageFiles?.[0]}
          />
        </View>

        <View>
          <Text className="font-bold mb-1">Jules Lemire</Text>
          <Text className="text-sm">Ya, I agree. that wou...</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Unread
