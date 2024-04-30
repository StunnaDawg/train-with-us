import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities } from "../../../@types/supabaseTypes"

type CommunityCardProps = {
  community: Communities
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const [files, setFiles] = useState<FileObject[]>([])
  const { user } = useAuth()
  const navigation = useNavigation<NavigationType>()

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
    <Pressable
      onPress={() => {
        navigation.navigate("ViewCommunitiesScreen", {
          communityId: community.id,
        })
      }}
    >
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePic
            size={90}
            item={files[0]}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className="font-bold text-2xl">
            {community.community_title}
          </Text>
          <Text className="text-xs">10km away</Text>
          <View className="border-b p-3" />
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityCard
