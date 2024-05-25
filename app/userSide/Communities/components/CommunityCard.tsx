import { View, Text, Pressable } from "react-native"
import React, { useEffect, useState } from "react"
import { NavigationType } from "../../../@types/navigation"
import { useNavigation } from "@react-navigation/native"
import SinglePic from "../../../components/SinglePic"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import supabase from "../../../../lib/supabase"
import { FileObject } from "@supabase/storage-js"
import { Communities, Profile } from "../../../@types/supabaseTypes"
import useCurrentUser from "../../../supabaseFunctions/getFuncs/useCurrentUser"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePicCommunity from "../../../components/SinglePicCommunity"

type CommunityCardProps = {
  community: Communities
  addPrimary?: boolean
}

const CommunityCard = ({ community, addPrimary }: CommunityCardProps) => {
  const navigation = useNavigation<NavigationType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFiles, setImageFiles] = useState<string[] | null | undefined>([])
  const { user } = useAuth()

  useEffect(() => {
    if (!user) return

    getSingleCommunity(setLoading, community.id, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (currentCommunity?.community_photos === null || undefined) return
    setImageFiles(currentCommunity?.community_photos)
  }, [currentCommunity])

  return (
    <Pressable
      onPress={() => {
        addPrimary
          ? null
          : navigation.navigate("ViewCommunitiesScreen", {
              communityId: community.id,
            })
      }}
    >
      <View className="flex flex-row items-center">
        <View className="m-2">
          <SinglePicCommunity
            size={90}
            item={community.community_profile_pic}
            avatarRadius={100}
            noAvatarRadius={100}
          />
        </View>

        <View className="flex-col flex-1">
          <Text className=" text-white font-bold text-2xl">
            {community.community_title}
          </Text>
          <View className="border-b-2 border-b-white p-3" />
        </View>
      </View>
    </Pressable>
  )
}

export default CommunityCard
