import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { Communities } from "../../../@types/supabaseTypes"
import { useAuth } from "../../../supabaseFunctions/authcontext"
import getSingleCommunity from "../../../supabaseFunctions/getFuncs/getSingleCommunity"
import SinglePic from "../../../components/SinglePic"

type CommunityBubbleProps = {
  community: number
}

const CommunityBubble = ({ community }: CommunityBubbleProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [currentCommunity, setCurrentCommunity] = useState<Communities | null>(
    {} as Communities
  )
  const [imageFile, setImageFile] = useState<string | null | undefined>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user || community === null) return

    getSingleCommunity(setLoading, community, setCurrentCommunity)
  }, [user])

  useEffect(() => {
    if (
      currentCommunity?.community_profile_pic === null ||
      currentCommunity?.community_profile_pic === undefined
    )
      return
    setImageFile(currentCommunity?.community_profile_pic)
  }, [currentCommunity])
  return (
    <View className="items-center">
      <SinglePic
        size={55}
        avatarRadius={100}
        noAvatarRadius={100}
        item={imageFile}
      />
      <View className="m-1">
        <Text className="text-xs">{currentCommunity?.community_title}</Text>
      </View>
    </View>
  )
}

export default CommunityBubble
